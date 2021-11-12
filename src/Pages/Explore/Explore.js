import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./explore.css";
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Explore = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(true);
  useEffect(() => {
    setSearch(true);
    axios.get("http://localhost:5000/api/products/all").then((res) => {
      setProducts(res.data);

      setTimeout(() => setSearch(false), 500);
    });
  }, []);

  return !search ? (
    <div class="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product) => (
        <div class="col">
          <div class="card h-100 ">
            <img src={product.img_url} class="card-img-top" alt="..." />
            <div className="position-absolute card-overly bg-white">
              <FontAwesomeIcon
                icon={faCartPlus}
                size="3x"
                className="p-2 m-1"
              />
              <FontAwesomeIcon icon={faSearch} size="3x" className="p-2 m-1" />
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

              <span>{product.price}</span>
            </div>
            <div className="text-center p-2 m-2">
              <Link to={`/products/${product._id}`}>
                <button className="btn btn-info w-25">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Explore;