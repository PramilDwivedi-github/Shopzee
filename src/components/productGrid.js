import React from "react";
import ImgMediaCard from "./card";

import { product } from "./dummyProducts";
import { Grid } from "@mui/material";
import CartCard from "./cartcard";

function ProductGrid({ cart, products }) {
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
