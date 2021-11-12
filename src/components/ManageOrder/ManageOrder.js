import axios from "axios";
import React from "react";
import useData from "../../hooks/useData";

const MyOrders = () => {
  const { deleted, setDeleted, allOrders } = useData();

  console.log(allOrders, "allorders");

  const handleDelete = (id) => {
    let isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      axios
        .delete(
          `https://murmuring-hollows-32072.herokuapp.com/api/orders/delete/${id}`
        )
        .then((res) => {});
      setDeleted(!deleted);
    } else {
      return;
    }
  };

  const handleConfirmed = (id) => {
    axios
      .put(
        `https://murmuring-hollows-32072.herokuapp.com/api/order/status/${id}`,
        {
          status: "confirmed",
        }
      )
      .then((res) => {});
    setDeleted(!deleted);
  };

  const handleShipped = (id) => {
    axios
      .put(
        `https://murmuring-hollows-32072.herokuapp.com/api/order/status/${id}`,
        {
          status: "shipped",
        }
      )
      .then((res) => {});
    setDeleted(!deleted);
  };

  return (
    <div className="border col-10 col-sm-10 my-5">
      <h1 className="text-center">Manage Orders</h1>

      <div className=" responsive-table ">
        <table className="table  table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Order id</th>
              <th scope="col">Name</th>
              <th scope="col">email</th>
              <th scope="col">address</th>
              <th scope="col">status</th>
              <th scope="col">total</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr>
                <td>{order._id.toString().slice(-6)}</td>

                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>${parseInt(order.total).toFixed(2)}</td>

                <td>
                  <span className="d-flex ">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-info"
                    >
                      delete
                    </button>
                    <button
                      onClick={() => handleConfirmed(order._id)}
                      className="btn btn-info ms-2"
                    >
                      confirmed
                    </button>
                    <button
                      onClick={() => handleShipped(order._id)}
                      className="btn btn-info ms-2"
                    >
                      shipped
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
