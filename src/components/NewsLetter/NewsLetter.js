import React from "react";
import "./newsletter.css";
const NewsLetter = () => {
  return (
    <div className="container newsletter align-items-start d-flex flex-column justify-content-center my-4">
      <div className="ms-5">
        <h1>SUBSCRIBE OUR NEWSLETTER</h1>

        <h3> GET UPDATE FOR NEWS, OFFERS</h3>
        <input
          type="text"
          placeholder="Enter your email address"
          className="form-control  rounded-pill p-2"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
