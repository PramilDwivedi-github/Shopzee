import React, { useContext, useEffect } from "react";

import { Grid, Switch, Typography } from "@mui/material";
import RangeSlider from "./costFilter";
import CustomizedMenus from "../dashboard/categoryFilter";
import { productContext } from "../dashboard/products";

function Filter() {
  const { setFilter } = useContext(productContext);

  const [productFilter, setProductFilter] = React.useState({
    cost: [],
    category: "",
  });

  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (checked) {
      setFilter(productFilter);
    } else {
      setFilter({ cost: [], category: "" });
      setProductFilter({ cost: [], category: "" });
    }
  }, [checked]);
  return (
    <Grid container sx={{ marginTop: "5vh" }}>
      <Grid item md={4} xs={12}>
        <>
          <Typography>Cost</Typography>
          <RangeSlider
            setProductFilter={setProductFilter}
            productFilter={productFilter}
            checked={checked}
          />
        </>
      </Grid>
      <Grid item md={4} xs={12}>
        <CustomizedMenus
          setProductFilter={setProductFilter}
          productFilter={productFilter}
          checked={checked}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <>
          <Typography>Apply Filter</Typography>
          <Switch
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
              console.log(productFilter);
            }}
          />
        </>
      </Grid>
    </Grid>
  );
}

export default Filter;
