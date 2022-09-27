import React from "react";
import DiscreteSliderValues from "./costFilter";

import { Grid, Switch, Typography } from "@mui/material";

function Filter() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Grid container sx={{ marginTop: "2vh" }}>
      <Grid item md={4} xs={12}>
        <>
          <Typography>Cost</Typography>
          <DiscreteSliderValues />
        </>
      </Grid>
      <Grid item md={4} xs={12}>
        Category
      </Grid>
      <Grid item md={4} xs={12}>
        <>
          <Typography>Apply Filter</Typography>
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        </>
      </Grid>
    </Grid>
  );
}

export default Filter;
