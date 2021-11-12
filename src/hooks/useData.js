import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

//use data hook
const useData = () => {
  const [deleted, setDeleted] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const { user, token } = useAuth();

  useEffect(() => {
    /*   fetch("https://murmuring-hollows-32072.herokuapp.com/api/products/all")
      .then((data) => data.json())
      .then((data) => setAllProducts(data)); */

    axios
      .get(
        `https://murmuring-hollows-32072.herokuapp.com/api/myorders/${user.uid}`
      )
      .then((res) => setMyOrders(res.data));
  }, [deleted]);

  useEffect(() => {
    /*   axios
      .get(`https://murmuring-hollows-32072.herokuapp.com/api/orders/all/${user.email}`)
      .then((res) => setAllOrders(res.data)); */

    fetch(
      `https://murmuring-hollows-32072.herokuapp.com/api/orders/all/${user.email}`,
      {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        // body: JSON.stringify(user)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        /*   if (data.modifiedCount) {
                console.log(data);
                setSuccess(true);
            } */
        console.log(data, "res orders");
        setAllOrders(data);
      });
  }, [deleted]);

  console.log(allOrders, "myorders");

  return {
    deleted,
    setDeleted,
    myOrders,
    setMyOrders,
    allOrders,
  };
};

export default useData;
