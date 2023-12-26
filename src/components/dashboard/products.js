import { Divider, useMediaQuery, Button, useTheme } from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { backend_url } from "../../backendUrl";
import Filter from "../Filter/filter";
import ProductGrid from "../productGrid";
import PositionedSnackbar from "../snackbar";
import BasicModal from "./modal";

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
    let product_url = backend_url;
    if (login_role.role === "Customer") {
      product_url += "product/api/all";
    } else {
      product_url += "seller/api/myProducts";
    }

    const response = await fetch(product_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message === "success") {
      setProducts([...resp_data.products]);
    } else {
      alert("unale to fetch products");
      setSnackState({
        ...snackState,
        open: true,
        msg: "unale to fetch products",
      });
    }
  };

  const applyFilter = async () => {
    setProgressBar(true);
    let filterUrl = backend_url + "product/api/filter";

    const response = await fetch(filterUrl, {
      method: "POST",
      body: JSON.stringify({ filter }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const resp_data = await response.json();

    setProgressBar(false);

    if (resp_data.message === "success") {
      setProducts(resp_data.products);
      if (resp_data.products.length === 0)
        setSnackState({
          ...snackState,
          open: true,
          msg: "No Product Available for given filter",
          severity: "info",
        });
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
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
    } else {
      fetchProducts();
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
