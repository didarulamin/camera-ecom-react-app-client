import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import "./makeadmin.css";
const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const { token } = useAuth();

  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(email);

    fetch(
      `https://murmuring-hollows-32072.herokuapp.com/api/makeadmin/${email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        // body: JSON.stringify(user)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        /*   if (data.modifiedCount) {
                console.log(data);
                setSuccess(true);
            } */
        console.log(data);
        if (data.matchedCount) {
          toast.success("User made admin");
        } else {
          toast.success("User not found");
        }
      });
  };

  return (
    <div className="justify-content-center align-items-center row p-3 my-3 makeAdminContainer">
      <form onSubmit={handleSubmit} className="col-12 col-sm-4 text-center">
        <input
          className="form-control"
          placeholder="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" value="Submit" className="btn btn-info my-3" />
      </form>
    </div>
  );
};

export default MakeAdmin;
