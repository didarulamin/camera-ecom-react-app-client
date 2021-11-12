import axios from "axios";
import React from "react";
import useData from "../../hooks/useData";
import "./myorders.css";

const MyOrders = () => {
  const { myOrders, deleted, setDeleted } = useData();

  console.log(myOrders, "myorders");

  const handleDelete = (id) => {
    let isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      axios
        .delete(`http://localhost:5000/api/orders/delete/${id}`)
        .then((res) => {});
      setDeleted(!deleted);
    } else {
      return;
    }
  };

  return (
    <div className="border col-10 col-sm-10 my-5 myOrder-container">
      <h1 className="text-center">My Orders</h1>

      <div className=" responsive-table ">
        <table className="table  table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Order id</th>

              <th scope="col">email</th>
              <th scope="col">address</th>
              <th scope="col">status</th>
              <th scope="col">total</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr>
                <td>{order._id.toString().slice(-6)}</td>

                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>${order.total.toFixed(2)}</td>

                <td>
                  <span className="d-flex ">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-info"
                    >
                      delete
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
