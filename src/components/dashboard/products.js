import { Divider, useMediaQuery, Button, useTheme } from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Filter from "../Filter/filter";
import ProductGrid from "../productGrid";
import PositionedSnackbar from "../snackbar";
import BasicModal from "./modal";
import { getFilteredProducts, getProducts } from "../../services/products";

export const productContext = React.createContext();

function Products() {
  const {
    currentPage,
    login_role,
    setCurrentPage,
    setProgressBar,
  } = useContext(AppContext);

  const [products, setProducts] = useState([]);

  const initialFilter = { cost: [], category: "" };

  const [filter, setFilter] = useState(initialFilter);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const [progressBar, setProgressBar] = useState(false);

  // filter modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = useState(initialSnackState);

  const fetchProducts = async () => {
    setProgressBar(true);
    try {
      const resp_data = await getProducts(login_role.role)
      setProducts([...resp_data.products]);
    } catch(err) {
      alert("unale to fetch products");
      setSnackState({
        ...snackState,
        open: true,
        msg: err.message || "unale to fetch products",
      });
    }
    finally{
      setProgressBar(false);
    }
  };

  const applyFilter = async () => {
    setProgressBar(true);
    
    try{
      const resp_data = await getFilteredProducts(filter);
      setProducts(resp_data.products);
      if (resp_data.products.length === 0)
        setSnackState({
          ...snackState,
          open: true,
          msg: "No Product Available for given filter",
          severity: "info",
        });
    } catch(err) {
      setSnackState({ ...snackState, open: true, msg: err.message });
    }finally{
      setProgressBar(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setCurrentPage("Products");
  }, []);

  useEffect(() => {
    if (_.isEqual(filter, initialFilter) === false) {
      console.log(filter);
      applyFilter();
    } 
  }, [filter]);
  return (
    <div style={{ marginTop: isMatch ? "8vh" : "10vh" }}>
      {!isMatch ? (
        <div style={{ marginTop: "12vh" }}>
          <productContext.Provider value={{ filter, setFilter }}>
            <Filter />
          </productContext.Provider>
          <Divider />
        </div>
      ) : (
        <>
          <Button onClick={handleOpen} variant="contained">
            show Filters
          </Button>
          <productContext.Provider value={{ setFilter }}>
            <BasicModal open={open} setOpen={setOpen}></BasicModal>
          </productContext.Provider>
        </>
      )}

      <div>
        <PositionedSnackbar
          snackState={snackState}
          setSnackState={setSnackState}
        />
        {/* {progressBar && (
          <LinearDeterminate sx={{ height: "5%" }}></LinearDeterminate>
        )} */}
        <productContext.Provider
          value={{
            setCurrentPage,
            login_role,
            fetchProducts,
            setProgressBar,
          }}
        >
          <ProductGrid cart={currentPage === "Cart"} products={products} />
        </productContext.Provider>
      </div>
    </div>
  );
}

export default Products;
