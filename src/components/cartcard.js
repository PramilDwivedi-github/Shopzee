import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import LinearDeterminate from "./progressbar";
import PositionedSnackbar from "./snackbar";
import { cartContext } from "./dashboard/cart";
import { removeCartItem } from "../services/buyer";

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
    const resp_data = await removeCartItem(product.item_id);
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
          image={product && product.detail && product.detail.img && product.detail.img.img_url}
          onClick={() =>
            navigate(`/productDetail/${product&& product.detail && product.detail.product_id}`)
          }
        />
        <CardContent
          onClick={() =>
            navigate(`/productDetail/${product&& product.product_id}`)
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
