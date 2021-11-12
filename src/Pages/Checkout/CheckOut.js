import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./form.css";
import axios from "axios";

function CheckOutForm({ cartItems, total }) {
  const { user, setCart } = useAuth();
  const {
    register,
    handleSubmit,

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
      .post("http://localhost:5000/api/order/placed", orderDetails)
      .then((res) => {
        console.log(res.data);
      });

    setCart([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column d-flex">
      <span>
        {(errors.email && <span> valid Email is required</span>) ||
          (errors.password && <span> Valid password is required</span>)}
      </span>
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
        className="p-3 btn btn-success my-3 "
        type="submit"
        value="Checkout"
      />
    </form>
  );
}

const CheckOut = () => {
  const { id } = useParams();
  const { cart } = useAuth();

  // const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    /*  axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
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
        cartProducts.push({ ...uniq[0], quantity: count[prop] });
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

  return (
    <div className="row">
      <div>
        <h1>Items</h1>
        {cartItems.map((item) => (
          <div className="d-flex justify-content-around border rounded w-50">
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            {(total = item.price * item.quantity)}
            <p>payable :{total.toFixed(2)}</p>
          </div>
        ))}
        <p>Total :{total.toFixed(2)}</p>
      </div>

      <div className="col-4">
        <CheckOutForm cartItems={cartItems} total={total} />
      </div>
    </div>
  );
};

export default CheckOut;
