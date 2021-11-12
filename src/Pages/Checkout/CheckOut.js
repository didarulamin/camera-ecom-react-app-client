import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./form.css";
import axios from "axios";
import { toast } from "react-toastify";

function CheckOutForm({ cartItems, total }) {
  const { user, setCart } = useAuth();
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
    localStorage.removeItem("cartItems");
    toast.success("Order placed successfully");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-column d-flex border"
    >
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

const CheckOut = () => {
  // const { id } = useParams();
  const { cart } = useAuth();

  // const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    /*  axios.get(`https://murmuring-hollows-32072.herokuapp.com/api/product/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    }); */

    function findCartProducts(array) {
      const count = {};
      const result = [];

      array.forEach((item) => {
        if (count[item._id]) {
          count[item._id] += 1;
          return;
        }
        count[item._id] = 1;
      });

      for (let prop in count) {
        if (count[prop] >= 2) {
          result.push(prop);
        }
      }

      const cartProducts = [];

      console.log(count);
      for (let prop in count) {
        console.log(prop);

        const uniq = array.filter(
          (v, i, a) => a.findIndex((t) => t._id === prop) === i
        );
        cartProducts.push({
          ...uniq[0],
          quantity: count[prop],
          total: uniq[0].price * count[prop],
        });
      }
      console.log(cartProducts, "cart");
      setCartItems(cartProducts);
      // return result;
    }

    findCartProducts(cart);
  }, [cart]);

  console.log(cartItems, "cartItems");
  let total = cartItems.reduce(function (acc, curr) {
    return acc + curr.quantity * curr.price;
  }, 0);

  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
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
            {cartItems.map((item) => (
              // {(total = item.price * item.quantity)}

              <tr>
                <th scope="row">1</th>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.total.toFixed(2)}</td>

                <td>
                  <button
                    onClick={() => handleRemove(item._id)}
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
          <span className="fs-3 border p-2">Subtotal: ${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="col-sm-4 mt-4 ">
        <h1>Shipping information</h1>
        <CheckOutForm cartItems={cartItems} total={total} />
      </div>
    </div>
  );
};

export default CheckOut;
