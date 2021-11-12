import React, { useState } from "react";

import AddProduct from "../../components/AddProduct/AddProduct";
import MakeAdmin from "../../components/MakeAdmin/MakeAdmin";
import ManageOrder from "../../components/ManageOrder/ManageOrder";
import ManageProducts from "../../components/ManageProducts/ManageProducts";
import useAuth from "../../hooks/useAuth";
import "./dashboard.css";

const Dashboard = () => {
  const [tab, setTab] = useState("addProduct");
  const { logOut } = useAuth();
  return (
    <div className="d-sm-flex ">
      <div className="sidebar">
        <ul>
          <li className="active btn" onClick={() => setTab("addProduct")}>
            Add Product
          </li>
          <li className="active btn" onClick={() => setTab("manageProducts")}>
            Manage Products
          </li>
          <li className="active btn" onClick={() => setTab("manageOrders")}>
            Manage Orders
          </li>
          <li className="active btn" onClick={() => setTab("makeAdmin")}>
            Make Admin
          </li>
          <li className="active btn" onClick={() => logOut()}>
            Logout
          </li>
        </ul>
      </div>

      <div className="content row d-sm-flex justify-content-center align-items-center p-0 m-0">
        {tab === "addProduct" && <AddProduct />}
        {tab === "manageOrders" && <ManageOrder />}
        {tab === "manageProducts" && <ManageProducts />}
        {tab === "makeAdmin" && <MakeAdmin />}
      </div>
    </div>
  );
};

export default Dashboard;
