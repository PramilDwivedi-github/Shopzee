import { Grid, CardMedia, Card, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router";

function ProductDetail() {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div style={{ marginTop: "5vh" }}>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Card sx={{ maxWidth: 600, maxHeight: 600, height: 250 }}>
            <CardMedia
              sx={{ objectFit: "contain" }}
              component="img"
              alt="green iguana"
              height="180"
              image={product.img}
            />
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            <div>
              <Typography sx={{ fontSize: "2rem" }}>{product.name}</Typography>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {`${product.price} $`}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "green" }}>
                available
              </Typography>
              <Typography>{`Picked ${1}`}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="contained" sx={{ background: "green" }}>
                cart
              </Button>
              <button>+</button>
              <button>-</button>
            </div>
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography sx={{ fontSize: "1.6rem" }}>Description</Typography>
          <Typography>{product.description}</Typography>
          <Typography sx={{ fontSize: "1.6rem" }}>Sller Info</Typography>
          <Typography>This is seller information</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetail;
