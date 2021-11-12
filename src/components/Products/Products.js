import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <div class=" container justify-content-center align-items-center my-5">
        <h1 className="text-center my-3">Featured Products</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.slice(0, 6).map((product) => (
            <div class="col">
              <Link to={`/products/${product._id}`}>
                <div class="card h-100 ">
                  <img src={product.img_url} class="card-img-top" alt="..." />
                  <div className="position-absolute card-overly bg-white">
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      size="3x"
                      className="p-2 m-1"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="3x"
                      className="p-2 m-1"
                    />
                  </div>
                  <div class="card-body d-flex justify-content-between">
                    <div>
                      <h5 class="card-title">{product.title}</h5>
                      <Rating
                        initialRating={product.rating}
                        readonly
                        emptySymbol={["fa fa-star-o  icon"]}
                        fullSymbol={["fa fa-star  icon"]}
                      />
                    </div>

                    <span className="fs-4">${product.price}</span>
                  </div>
                  {/* <div className="text-center p-2 m-2">
                  <Link to={`/products/${product._id}`}>
                    <button className="btn btn-info w-25">Buy Now</button>
                  </Link>
                </div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
