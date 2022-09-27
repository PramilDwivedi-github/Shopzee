import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Login from "./components/LoginComponent/login";
import Register from "./components/RegisterComponent/register";
import Dashboard from "./components/dashboard/dashboard";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Router,
} from "react-router-dom";
import Products from "./components/dashboard/products";
import Orders from "./components/dashboard/orders";
import Cart from "./components/dashboard/cart";
import CustomRoute from "./components/CustomRoute";
import ProductDetail from "./components/dashboard/ProductDetail";
import AddProduct from "./components/dashboard/addproduct";

export const AppContext = React.createContext();

const App = () => {
  const [currentPage, setCurrentPage] = useState("Products");
  const [progressBar, setProgressBar] = useState(false);
  const [login_role, setLoginRole] = useState({
    isLoggedIn: false,
    role: "Customer",
  });
  // render() {
  return (
    <AppContext.Provider
      value={{
        currentPage,
        progressBar,
        login_role,
        setCurrentPage,
        setProgressBar,
        login_role,
        setLoginRole,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/products"} />} />
            <Route strict path="/" element={<Dashboard />}>
              <Route path="products" element={<Products />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="productDetail" element={<ProductDetail />}></Route>
              <Route path="addProduct" element={<AddProduct />}></Route>
            </Route>

            <Route
              path="/login"
              element={<Login setLoginRole={setLoginRole} />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
  // }
};

export default App;
