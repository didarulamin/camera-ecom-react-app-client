import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./form.css";
import axios from "axios";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

function CheckOutForm({ cartItems, total }) {
  const { user, setCart, setBuyNowCart } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const orderItems = [...cartItems];
    console.log(orderItems, "order");
    const orderDetails = {
      orderItems,
      ...data,
      total,
      userId: user.uid,
      email: user.email,
      name: user.displayName,
      orderDate: new Date(),
      status: "pending",
    };
    console.log(orderDetails);

    axios
      .post(
        "https://murmuring-hollows-32072.herokuapp.com/api/order/placed",
        orderDetails
      )
      .then((res) => {
        console.log(res.data);
      });

    setCart([]);

    toast.success("Order placed successfully");
    setBuyNowCart([]);
    history.push("/explore/");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-column d-flex border"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buy now</title>
      </Helmet>
      <span></span>
      <input
        className=" p-2  m-2 no-outline input-style"
        defaultValue={user.displayName}
        placeholder="name"
      />
      <input
        className=" p-2  m-2 no-outline input-style"
        defaultValue={user.email}
        placeholder="Email"
      />
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("address", {
          required: true,
        })}
        placeholder="address"
      />
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("phone", {
          required: true,
        })}
        placeholder="Phone"
      />

      <input
        className="p-3 btn btn-info my-3 "
        type="submit"
        value="Checkout"
      />
    </form>
  );
}

const BuyNow = () => {
  const { buyNowCart, setBuyNowCart } = useAuth();
  const history = useHistory();

  const handleRemove = (id) => {
    setBuyNowCart([]);
    history.goBack();
  };

  return (
    <div className="row container">
      <div className="col-sm-8">
        <h1>Items</h1>

        <table className="table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item name</th>
              <th scope="col">price</th>
              <th scope="col">Qty</th>
              <th scope="col">total</th>
              <th scope="col">action</th>
            </tr>
          </thead>

          <tbody>
            {buyNowCart.map((item) => (
              // {(total = item.price * item.quantity)}

              <tr>
                <th scope="row">1</th>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>1</td>
                <td>${item.price}</td>

                <td>
                  <button
                    onClick={() => handleRemove()}
                    className="btn btn-info"
                  >
                    remove
                  </button>
                </td>
              </tr>

              // </div>
            ))}
          </tbody>
        </table>
        <div className="my-3">
          <span className="fs-3 border p-2">
            Subtotal: ${buyNowCart[0]?.price}
          </span>
        </div>
      </div>

      <div className="col-sm-4 mt-4 ">
        <h1>Shipping information</h1>
        <CheckOutForm cartItems={buyNowCart} total={buyNowCart[0]?.price} />
      </div>
    </div>
  );
};

export default BuyNow;
