import React from "react";
import { useLocation } from "react-router";
import { product } from "../dummyProducts";
import OrderItemCard from "../orderItemCard";
import { Grid } from "@mui/material";

function OrderDetail() {
  const { state } = useLocation();

  const { items } = state;

  return (
    <div
      className="OrderDetail"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "5vh",
      }}
    >
      <div>
        <Grid container sx={{ width: "100%", alignSelf: "baseline" }}>
          <Grid item xs={12}>
            {items.map((item, index) => (
              <OrderItemCard item={item} />
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default OrderDetail;
