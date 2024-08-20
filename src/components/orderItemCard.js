import React from "react";
import {
  Grid,
  Typography,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";

function OrderItemCard({ item }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const NavigateToDetail = () => {
    navigate(`/productDetail/${item.product.product_id}`);
  };

  return (
    <Grid container width={isMatch ? 360 : 520} height={120}>
      <Grid item xs={4} boxShadow="1">
        <CardMedia
          sx={{ objectFit: "contain" }}
          onClick={NavigateToDetail}
          component="img"
          image={item.product.img}
          height="120"
        ></CardMedia>
      </Grid>
      <Grid item xs={8} boxShadow="1">
        <div>
          <div>
            <Typography>{item.product.name}</Typography>
          </div>

          <div>
            {" "}
            <Typography variant="caption">{item.copies}</Typography>
            <Typography variant="caption" sx={{ marginLeft: "1vw" }}>
              {`copies`}
            </Typography>
          </div>

          <Typography color={"green"}>{`${item.cost} Rs`}</Typography>
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

export default OrderItemCard;
