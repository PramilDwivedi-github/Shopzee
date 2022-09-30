import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { resolvePath, useNavigate } from "react-router";
import { backend_url } from "../backendUrl";
import LinearDeterminate from "./progressbar";
import PositionedSnackbar from "./snackbar";
import { cartContext } from "./dashboard/cart";

export default function CartCard({ product }) {
  const navigate = useNavigate();

  //   const [detail, setDetail] = React.useState();

  const [progressBar, setProgressBar] = React.useState(false);
  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = React.useState(initialSnackState);

  //   React.useEffect(() => {
  //     setDetail(product.detail);
  //   }, []);

  const fetchCartItems = React.useContext(cartContext);

  const removeItem = async () => {
    setProgressBar(true);
    let cartUrl = backend_url + "buyer/api/removeCartItem";
    const response = await fetch(cartUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ item_id: product.item_id }),
    });
    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message === "Deleted Cart Item") {
      fetchCartItems();
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
    }
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400 }}>
      {progressBar && <LinearDeterminate sx={{ height: "5%" }} />}
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <CardActionArea>
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          alt="green iguana"
          height="180"
          image={product.detail.img}
          onClick={() =>
            navigate("/productDetail", { state: { product: product.detail } })
          }
        />
        <CardContent
          onClick={() =>
            navigate("/productDetail", { state: { product: product.detail } })
          }
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.detail.name}
          </Typography>
          <Typography
            sx={{ color: "blue" }}
          >{`${product.detail.price} Rs`}</Typography>
          <Typography>{product.copies}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={removeItem}
            sx={{ background: "red" }}
          >
            Remove
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
