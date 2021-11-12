import axios from "axios";
import React, { useState } from "react";
import Rating from "react-rating";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import "./reviews.css";

const Reviews = () => {
  const { user } = useAuth();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const handleReview = (e) => {
    e.preventDefault();
    console.log(review, rating);
    const reviewData = {
      uid: user.uid,
      username: user.displayName,
      useremail: user.email,
      photoURL: user.photoURL,
      review: review,
      rating: rating,
    };

    axios
      .post("http://localhost:5000/api/review/submit", { reviewData })
      .then((res) => {
        toast.success("Review Submitted");
      })
      .catch((err) => {});
  };
  return (
    <div className="row justify-content-center align-items-center text-center p-0 m-0 my-4 reviews-container">
      <div className="col-10 col-sm-4 text-center">
        <h1>Give review</h1>

        <form onSubmit={handleReview}>
          <textarea
            className="form-control my-2"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <Rating
            className="form-control my-2"
            emptySymbol="fa fa-star-o fa-2x  "
            fullSymbol="fa fa-star fa-2x icon"
            fractions={2}
            onChange={(rate) => setRating(rate)}
          />

          <input className="btn btn-info my-2" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Reviews;
