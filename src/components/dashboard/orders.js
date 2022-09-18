import { Grid } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router";
import StickyHeadTable from "./orderTable";

function Orders() {
  const { login_role } = useOutletContext();
  return (
    <div
      className="Order-Returning-div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div>
        <Grid container sx={{ width: "100%", alignSelf: "baseline" }}>
          <Grid item xs={12}>
            {login_role.isLoggedIn && <StickyHeadTable />}
            {!login_role.isLoggedIn && <>Login to view orders</>}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Orders;
