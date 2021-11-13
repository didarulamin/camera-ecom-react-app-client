import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AuthProvider from "./contexts/AuthProvider";
import Login from "./Pages/Account/Login";
import Register from "./Pages/Account/Register";
import Home from "./Pages/Home/Home";
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import NotFound from "./components/NotFound/NotFound";
import PassReset from "./Pages/Account/PassReset";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Explore from "./Pages/Explore/Explore";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CheckOut from "./Pages/Checkout/CheckOut";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import BuyNow from "./Pages/BuyNow/BuyNow";
import "./App.css";

function App() {
  /*   return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profileUpdate">
              <ProfileUpdate />
            </Route>
            <Route path="/PassReset">
              <PassReset />
            </Route>
            <AdminRoute path="/dashboard">
              <Dashboard />
            </AdminRoute>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <PrivateRoute path="/buynow/">
              <BuyNow />
            </PrivateRoute>
            <PrivateRoute path="/checkout/">
              <CheckOut />
            </PrivateRoute>
            <PrivateRoute path="/userDashboard">
              <UserDashboard />
            </PrivateRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  ); */

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
    // setSpinner(false);
  }, []);

  return !spinner ? (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profileUpdate">
              <ProfileUpdate />
            </Route>
            <Route path="/PassReset">
              <PassReset />
            </Route>
            <AdminRoute path="/dashboard">
              <Dashboard />
            </AdminRoute>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <PrivateRoute path="/buynow/">
              <BuyNow />
            </PrivateRoute>
            <PrivateRoute path="/checkout/">
              <CheckOut />
            </PrivateRoute>
            <PrivateRoute path="/userDashboard">
              <UserDashboard />
            </PrivateRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default App;
