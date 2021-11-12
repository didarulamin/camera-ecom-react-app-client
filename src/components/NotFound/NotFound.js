import React from "react";
import { Helmet } from "react-helmet";

//404 page component
const NotFound = () => {
  return (
    <div>
      {/* page titile */}
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className="row   p-0 m-0 flex-column align-items-center my-5">
        <div className="col-8 col-sm-4 text-center">
          <div className="m-sm-5 p-sm-5">
            <h1 className="fs-2">Opps! Page not found</h1>
            <p>
              The page you are looking for doesn't exist. Please try searching
              for some other page, or return to the website's homepage to find
              what you're looking for.
            </p>
          </div>
        </div>
        <div className="col-4 my-sm-5">
          <div>
            <img
              className="img-fluid"
              src="https://i.ibb.co/19zq8xL/404-16338b63.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
