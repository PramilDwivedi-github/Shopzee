import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../App";
import CustomizedMenus from "../category";
import PositionedSnackbar from "../snackbar";
import ImageCrousal from "../ImageCrousel";
import { addMyProduct } from "../../services/seller";

let initialProduct = {
  name: "",
  category: "",
  img: "",
  price: 0.0,
  description: "",
  available: "",
  productImages:[]
};

const acceptedFileExtensions = [".png",".jpg",".jpeg"]

function AddProduct() {
  const [product, setProduct] = useState(initialProduct);

  const { setProgressBar, setCurrentPage } = useContext(AppContext);

  const convertBase64 = (e) => {
    const image = {
      content:e.target.files[0],
      url:URL.createObjectURL(e.target.files[0]),
      title:e.target.files[0].name
    }
    setProduct({ ...product, productImages: [image, ...product.productImages ] });
  };

  const handleImageDelete = (image,index)=>{
    product.productImages.splice(index,1);
    setProduct({ ...product, productImages: [...product.productImages ] });
  }


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
    // for (let i in product) {
    //   if (product[i] === initialProduct[i]) {
    //     flag = false;
    //     empty = i;
    //     break;
    //   }
    // }
    if (flag) {
      if (isNaN(+product.price))
        setSnackState({
          ...snackState,
          msg: `Price should be in numbers`,
          open: true,
        });
      else {
        const payload = new FormData();

        Object.keys(product).forEach(field=>{
          if(field !== "productImages")
          payload.append(field,product[field])
        })


        product.productImages.forEach(image=>{
          payload.append("productImages",image.content)
        })

        try{
          const resp_data = await addMyProduct(payload);
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
        }catch(err){
          setSnackState({
            ...snackState,
            open: true,
            msg: err.message,
            severity: "info",
          });
        }finally{
          setProgressBar(false);
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
                // maxWidth: 600,
              maxHeight: 600,
              height: 250,
            }}
          >
            <ImageCrousal images={product.productImages} onImageDelete={handleImageDelete}/>
          </Card>
          <input type="file" multiple accept={acceptedFileExtensions.join(', ')} onChange={convertBase64}/>
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
