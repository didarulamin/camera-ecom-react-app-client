import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { Link, useHistory, useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart, setCart, forceUpdate } = useAuth();
  const { quantity, setQuantity } = useState(1);
  const { buyNowCart, setBuyNowCart } = useAuth();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://murmuring-hollows-32072.herokuapp.com/api/product/${id}`)
      .then((res) => {
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

  const handleBuyNow = (buy_product) => {
    let tcart = buyNowCart;
    tcart.pop();
    tcart.push(buy_product);
    setBuyNowCart(tcart);
    // forceUpdate((n) => !n);
    history.push("/buynow/");
  };

  return (
    <div className="container my-3 ">
      <div className="row ">
        <div className="col-sm-6 col-12 d-flex justify-content-center">
          <img className="img-fluid" src={product.img_url} alt="" />
        </div>
        <div className="col-sm-6 col-12  d-flex  flex-column">
          <div className="d-flex justify-content-between  fs-4 my-3">
            <p>{product.title}</p>
            <p>${product.price}</p>
          </div>
          <Rating
            initialRating={product.rating}
            readonly
            emptySymbol={["fa fa-star-o  icon"]}
            fullSymbol={["fa fa-star  icon"]}
          />

          <div>
            <ul className="fs-5">
              <p className="fs-4 my-3">Specification</p>
              {product.specification?.split("\n").map((item, index) => (
                <li>{item}</li>
              ))}
            </ul>
            {/* <p className="fs-5">{product.specification}</p> */}
          </div>

          <div>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => setQuantity(quantity + 1)}
            />
            <span className="mx-3">{quantity}</span>
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() => setQuantity(quantity - 1)}
            />
          </div>

          <div className="my-2 mx-2">
            {/*   <Link to={`/buynow/${id}`}>
              <button className="btn btn-info">Buy Now</button>
            </Link> */}
            <button
              onClick={() => handleBuyNow(product)}
              className="btn btn-info"
            >
              Buy Now
            </button>

            <button
              title="click multiple time to add quantity"
              className="btn btn-info w-25 mx-4"
              onClick={() => handleAddCart(product)}
            >
              addToCart
            </button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active fs-3"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Description
            </button>
            <button
              className="nav-link fs-3"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Specifications
            </button>
            <button
              className="nav-link fs-3"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Reviews
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <p className="fs-5 w-50">{product.description}</p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <ul className="fs-5">
              {product.specification?.split("\n").map((item, index) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
