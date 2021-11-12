import React, { useState } from "react";
import MyOrders from "../../components/MyOrders/MyOrders";
import Payment from "../../components/Payment/Payment";
import Reviews from "../../components/Reviews/Reviews";
import useAuth from "../../hooks/useAuth";

import "./dashboard.css";

const UserDashboard = () => {
  const [tab, setTab] = useState("myorders");
  const { logOut } = useAuth();
  return (
    <div className="d-sm-flex ">
      <div className="sidebar">
        <ul>
          <li className="active btn" onClick={() => setTab("pay")}>
            Pay
          </li>
          <li className="active btn" onClick={() => setTab("myorders")}>
            My Orders
          </li>
          <li className="active btn" onClick={() => setTab("reviews")}>
            Review
          </li>
          <li className="active btn" onClick={() => logOut()}>
            Logout
          </li>
        </ul>
      </div>

      <div className="content row d-sm-flex justify-content-center align-items-center p-0 m-0">
        {tab === "pay" && <Payment />}
        {tab === "myorders" && <MyOrders />}
        {tab === "reviews" && <Reviews />}
      </div>
    </div>
  );
};

export default UserDashboard;
