import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./form.css";
import google from "../../assets/google.png";
import useFirebase from "../../hooks/useFirebase";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

function LoginForm() {
  const location = useLocation();
  const history = useHistory();

  const redirect_uri = location.state?.from || "/";
  const { signInUsingEmailAndPassword } = useFirebase();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUsingEmailAndPassword(data.email, data.password)
      .then(() => {
        toast("Success", { type: "success" });
        history.push(redirect_uri);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column d-flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <span>
        {(errors.email && <span> valid Email is required</span>) ||
          (errors.password && <span> Valid password is required</span>)}
      </span>
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          },
        })}
        placeholder="Email"
      />

      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("password", {
          required: true,
        })}
        placeholder="Password"
        type="password"
      />

      <input className="p-3 btn btn-info my-3 " type="submit" value="Login" />
    </form>
  );
}

const Login = () => {
  const { signInUsingGoogle, admin } = useFirebase();
  const location = useLocation();
  const history = useHistory();

  let redirect_uri = location.state?.from || "/";
  if (redirect_uri.pathname === "/dashboard" && !admin.email) {
    redirect_uri = "/";
  }

  const handleGoogleSignIn = () => {
    signInUsingGoogle(redirect_uri, history);
  };

  return (
    <div className="row justify-content-center align-items-center text-center p-0 m-0 my-4">
      <div className="col-10 col-sm-6 col-md-6 col-lg-4 flex-column border border-dark  p-3">
        <p className="fs-4 ">Login with Email</p>
        <LoginForm />
        <span>
          Forgot password?
          <span className="mx-2">
            <Link to="/PassReset">Reset</Link>
          </span>
        </span>
        <br />
        <span>
          Don't have an account?
          <span className="mx-2">
            <Link to="/register">Create an account</Link>
          </span>
        </span>
      </div>

      <div className="d-flex  justify-content-center align-items-center my-3">
        <div className="border border-dark  or"></div>
        <span className="mx-2">Or</span>
        <div className="border border-dark  or"></div>
      </div>

      <div className="my-4">
        <button
          onClick={handleGoogleSignIn}
          className="btn border p-2 rounded-pill btn-info"
        >
          <span className="m-4">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
