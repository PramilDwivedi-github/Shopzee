import {
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function OrderCard({ order_id, name, orderItemCount, date, cost }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container width={isMatch ? 360 : 500} height={120}>
      <Grid item xs={4} boxShadow="1">
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          image={"http://www.tennisnuts.com/images/product/full/S1444.jpg"}
          height="120"
        ></CardMedia>
      </Grid>
      <Grid item xs={8} boxShadow="1">
        <div>
          <div>{name}</div>
          <Typography variant="caption">{`+${orderItemCount -
            1}more`}</Typography>
          <div>{date}</div>
          <div>{cost}</div>
        </div>
      </Grid>
    </Grid>
  );
}

export default OrderCard;
