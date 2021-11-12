import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart, setCart, forceUpdate } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, [id]);

  const handleAddCart = (add_product) => {
    // setCart([add_product,...cart ]);
    let tcart = cart;
    tcart.push(add_product);
    setCart(tcart);
    console.log(add_product, "add clicked");
    console.log(cart, "btn clicked");
    console.log(cart.length);
    forceUpdate((n) => !n);
    // find_duplicate_in_array(cart);
  };

  return (
    <div>
      <div className="row">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h1>{product.title}</h1>
        </div>
        <button onClick={() => handleAddCart(product)}>addToCart</button>
        <Link to={`/checkout/${id}`}>
          <button className="btn btn-info">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
