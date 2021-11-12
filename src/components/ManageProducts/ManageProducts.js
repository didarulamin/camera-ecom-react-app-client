import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateProducts from "../UpdateProduct/UpdateProducts";
import "./manageproducts.css";
const ManageProducts = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [product, setProduct] = useState({});
  const [forceUpdate, setforceUpdate] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [forceUpdate]);

  const handleUpdate = (product) => {
    // setUpdate(!update);

    setProduct(product);
    setUpdate(true);
  };

  const handleDelete = (id) => {
    /*     fetch(`http://localhost:5000/api/product/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        forceUpdate((n) => !n);
      }); */

    let isDelete = window.confirm("Are you sure?");

    if (isDelete) {
      axios
        .delete(`http://localhost:5000/api/product/delete/${id}`)
        .then((res) => {
          console.log(res);
          //   forceUpdate((n) => !n);
          setforceUpdate(!forceUpdate);
        });
    } else {
      return;
    }
  };
  return (
    <>
      {!update ? (
        <div className="border col-10 col-sm-10 my-5">
          <h1 className="text-center">Manage Products</h1>

          <div className=" responsive-table ">
            <table className="table  table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Product id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr>
                    <td>{product._id.toString().slice(-6)}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.inventory}</td>
                    <td>{product.rating}</td>
                    <td>
                      <span className="d-flex ">
                        <button
                          onClick={() => handleUpdate(product)}
                          className="btn btn-info mx-2"
                        >
                          update
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
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
      ) : (
        <UpdateProducts
          product={product}
          setUpdate={setUpdate}
          setforceUpdate={setforceUpdate}
          forceUpdate={forceUpdate}
        />
      )}
    </>
  );
};
export default ManageProducts;
