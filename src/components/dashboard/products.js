import { Divider, Grid, Slider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { backend_url } from "../../backendUrl";
import ImgMediaCard from "../card";
import Filter from "../Filter/filter";
import ProductGrid from "../productGrid";
import LinearDeterminate from "../progressbar";
import PositionedSnackbar from "../snackbar";

export const productContext = React.createContext();

function Products() {
  const { currentPage, login_role, setCurrentPage } = useOutletContext();

  const [products, setProducts] = useState([]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [progressBar, setProgressBar] = useState(false);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ marginTop: "1vh" }}>
      {!isMatch ? (
        <div style={{ marginTop: "5vh" }}>
          <Filter />
          <Divider />
        </div>
      ) : (
        <></>
      )}

      <div>
        <PositionedSnackbar
          snackState={snackState}
          setSnackState={setSnackState}
        />
        {progressBar && (
          <LinearDeterminate sx={{ height: "5%" }}></LinearDeterminate>
        )}
        <productContext.Provider
          value={{ setCurrentPage, login_role, fetchProducts }}
        >
          <ProductGrid cart={currentPage === "Cart"} products={products} />
        </productContext.Provider>
      </div>
    </div>
  );
}

export default Products;
