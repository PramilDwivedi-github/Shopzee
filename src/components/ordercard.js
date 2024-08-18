import { CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Grid } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router";

function OrderCard({ order }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const name = order.items[0].product.name;
  const date = order.order.createdAt;
  const orderItemCount = order.items.length;
  const cost = order.cost;
  const image = order.items[0].product.img;

  const navigate = useNavigate();

  const NavigateToDetail = () => {
    navigate("/orderDetail", { state: { items: order.items } });
  };

  return (
    <Grid container width={isMatch ? 360 : 520} height={120} marginTop="2vh">
      <Grid item xs={4} boxShadow="1">
        <CardMedia
          sx={{ objectFit: "contain" }}
          onClick={NavigateToDetail}
          component="img"
          image={image}
          height="120"
        ></CardMedia>
      </Grid>
      <Grid item xs={8} boxShadow="1">
        <div>
          <div>
            <Typography>{name}</Typography>
            <Typography variant="caption">{`+${orderItemCount -
              1}more`}</Typography>
          </div>

          <div>
            {" "}
            <Typography variant="caption">{date.slice(0, 10)}</Typography>
            <Typography variant="caption" sx={{ marginLeft: "1vw" }}>
              {date.slice(12, 16)}
            </Typography>
          </div>

          <Typography color={"green"}>{`${cost} Rs`}</Typography>
          <Typography
            onClick={NavigateToDetail}
            variant="caption"
            sx={{ cursor: "pointer", color: "Highlight" }}
          >
            View Details
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default OrderCard;
