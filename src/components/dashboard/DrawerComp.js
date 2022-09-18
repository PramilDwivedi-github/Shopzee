import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router";

export default function TemporaryDrawer({ login_role, handleLogout }) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  const NotSignedIn = ["Login", "SignUp", "Products", "Filter"];
  const unSignedIcons = [
    LoginIcon,
    ArrowUpwardIcon,
    DashboardIcon,
    FilterListIcon,
  ];
  const SignedIn = [
    "Profile",
    "Cart",
    "Orders",
    "Logout",
    "Products",
    "Filter",
    "AddProduct",
  ];
  const SignedIcons = [
    PersonOutlineIcon,
    AddShoppingCartIcon,
    WidgetsIcon,
    LogoutIcon,
    DashboardIcon,
    FilterListIcon,
    AddIcon,
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 180 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {login_role.isLoggedIn &&
          SignedIn.map((text, index) => {
            const Icon = SignedIcons[index];
            if (login_role.role === "Admin" && text === "Cart") return <></>;
            if (login_role.role === "Customer" && text === "AddProduct")
              return <></>;
            return (
              <ListItem
                key={text}
                disablePadding
                onClick={() => {
                  switch (index) {
                    case 4:
                      navigate("/products");
                      break;
                    case 1:
                      navigate("/cart");
                      break;
                    case 2:
                      navigate("/orders");
                      break;
                    case 3:
                      handleLogout();
                      break;
                    case 6:
                      navigate("/addProduct");
                  }
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      {/* <Divider /> */}
      <List>
        {!login_role.isLoggedIn &&
          NotSignedIn.map((text, index) => {
            const Icon = unSignedIcons[index];
            return (
              <ListItem
                key={text}
                disablePadding
                onClick={() => {
                  switch (index) {
                    case 2:
                      navigate("/products");
                      break;
                    case 1:
                      navigate("/register");
                      break;
                    case 0:
                      navigate("/login");
                  }
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>
            <MenuIcon sx={{ color: "white" }} />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
