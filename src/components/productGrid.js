import React, { useEffect } from "react";
import ImgMediaCard from "./card";

import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import CartCard from "./cartcard";

function ProductGrid({ cart, products }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/products" && cart) console.log(cart);
  }, []);

  return (
    <div>
      <Grid container spacing={1}>
        {products.map((p, i) => (
          <Grid key={i} item xs={6} sm={3}>
            {cart ? (
              <CartCard product={p} />
            ) : (
              <ImgMediaCard product={p} cart={cart} />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductGrid;
