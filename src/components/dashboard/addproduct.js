import {
  Grid,
  Card,
  CardMedia,
  Input,
  TextField,
  Button,
  Typography,
  breadcrumbsClasses,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AppContext } from "../../App";
import { backend_url } from "../../backendUrl";
import CustomizedMenus from "../category";
import LinearDeterminate from "../progressbar";
import PositionedSnackbar from "../snackbar";

let initialProduct = {
  name: "",
  category: "",
  img: "",
  price: 0.0,
  description: "",
  available: "",
};

function AddProduct() {
  const [product, setProduct] = useState(initialProduct);

  const { setProgressBar, setCurrentPage } = useContext(AppContext);

  const convertBase64 = (e) => {
    let files = e.target.files;
    let file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProduct({ ...product, img: reader.result });
    };
  };
  const [snackState, setSnackState] = useState({
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
  });

  const navigate = useNavigate();

  const addProduct = async () => {
    setProgressBar(true);
    console.log(product);
    let flag = true;
    let empty = null;
    for (let i in product) {
      if (product[i] === initialProduct[i]) {
        flag = false;
        empty = i;
        break;
      }
    }
    if (flag) {
      if (isNaN(+product.price))
        setSnackState({
          ...snackState,
          msg: `Price should be in numbers`,
          open: true,
        });
      else {
        const response = await fetch(backend_url + "seller/api/addProduct", {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const resp_data = await response.json();
        setProgressBar(false);
        if (resp_data.message === "product added successfully") {
          setSnackState({
            ...snackState,
            open: true,
            msg: resp_data.message,
            severity: "success",
          });
          setTimeout(() => {
            setCurrentPage("Products");
            navigate("/products");
          }, 2000);
        } else {
          setSnackState({
            ...snackState,
            open: true,
            msg: resp_data.message,
            severity: "info",
          });
        }
      }
    } else {
      setSnackState({ ...snackState, msg: `${empty} is empty`, open: true });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100vw",
        height: "100vh",
        marginTop: "12vh",
        alignSelf: "center",
      }}
      className="addProduct"
    >
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <Grid
        container
        style={{
          display: "flex",
          width: "75vw",
          height: "100%",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Grid item xs={12}>
          <Card
            sx={{
              //   maxWidth: 600,
              maxHeight: 600,
              height: 250,
            }}
          >
            <CardMedia
              sx={{ objectFit: "contain" }}
              component="img"
              alt="green iguana"
              height="250"
              src={product.img}
            />
          </Card>
          <Input type="file" onChange={convertBase64}></Input>
          <Typography variant="caption">
            choose product image in .jpeg or .png
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-required"
            label="Product Name"
            defaultValue=""
            margin="normal"
            sx={{ width: 300 }}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-required"
            label="Price"
            defaultValue=""
            margin="normal"
            sx={{ width: 300 }}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-required"
            label="quantity available"
            defaultValue=""
            margin="normal"
            sx={{ width: 300 }}
            onChange={(e) =>
              setProduct({ ...product, available: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomizedMenus
            sx={{ width: 300 }}
            product={product}
            setProduct={setProduct}
          />
        </Grid>
        <Grid item xs={12}>
          <textarea
            placeholder="description"
            style={{ height: "18vh", width: "80vw" }}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          ></textarea>
        </Grid>
        <Grid item sx={{ marginTop: "5vh" }}>
          <Button variant="contained" color="secondary" onClick={addProduct}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddProduct;
