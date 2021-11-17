import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import useData from "../../hooks/useData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";

// Example items, to simulate fetching from another resources.

const Pagination = () => {
  const { products, deleted } = useData();

  console.log(products);
  const [items, setItems] = useState();

  useEffect(() => {
    /*  axios
        .get("https://murmuring-hollows-32072.herokuapp.com/api/products/all")
        .then((res) => {
          setItems(res.data);
        }); */

    setItems(products);
  }, []);

  function Items({ currentItems }) {
    return (
      <div className=" container justify-content-center align-items-center my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {currentItems &&
            currentItems.map((product) => (
              <div className="col">
                <Link to={`/products/${product._id}`}>
                  <div className="card h-100 ">
                    <img
                      src={product.img_url}
                      className="card-img-top"
                      alt="..."
                    />
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
                    <div className="card-body d-flex justify-content-between">
                      <div>
                        <h5 className="card-title fs-4 ">{product.title}</h5>
                        <Rating
                          initialRating={product.rating}
                          readonly
                          emptySymbol={["fa fa-star-o  icon"]}
                          fullSymbol={["fa fa-star  icon"]}
                        />
                      </div>

                      <span className="fs-4">${product.price}</span>
                    </div>
                    {/*  <div className="text-center p-2 m-2">
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
    );
  }

  function PaginatedItems({ itemsPerPage, products }) {
    setItems(products);
    console.log(items, "items");
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items?.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div>
        <Items currentItems={currentItems} />
        <div className=" d-flex justify-content-center ">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PaginatedItems itemsPerPage={6} products={products} />
    </div>
  );
};

export default Pagination;
