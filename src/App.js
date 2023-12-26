import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/LoginComponent/login";
import Register from "./components/RegisterComponent/register";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Products from "./components/dashboard/products";
import Orders from "./components/dashboard/orders";
import Cart from "./components/dashboard/cart";
import ProductDetail from "./components/dashboard/ProductDetail";
import AddProduct from "./components/dashboard/addproduct";
import OrderDetail from "./components/dashboard/OrderDetail";
import Profile from "./components/dashboard/profile";
import Filter from "./components/Filter/filter";
import ForgetPass from "./components/forgotPassword/forgetpass";

export const AppContext = React.createContext();

const App = () => {
  const [currentPage, setCurrentPage] = useState("Products");
  const [progressBar, setProgressBar] = useState(false);
  const [login_role, setLoginRole] = useState({
    isLoggedIn: false,
    role: "Customer",
  });

  useEffect(() => {
    if (login_role.isLoggedIn === false && localStorage.getItem("token")) {
      setLoginRole({ isLoggedIn: true, role: localStorage.getItem("role") });
    }
  }, [login_role]);
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
              <Route path="orderDetail" element={<OrderDetail />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="filter" element={<Filter />}></Route>
            </Route>

            <Route
              path="/login"
              element={<Login setLoginRole={setLoginRole} />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgotPassword" element={<ForgetPass />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
  // }
};

export default App;
