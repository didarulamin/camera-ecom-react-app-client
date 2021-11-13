import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./form.css";
import google from "../../assets/google.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useFirebase from "../../hooks/useFirebase";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

function Form() {
  const { registerNewUser } = useFirebase();
  // form validation rules
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    fName: Yup.string().max(40).required("First name is required"),
    lName: Yup.string().max(40).required("Last name is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);

  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);

    registerNewUser(data);

    reset();
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column d-flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <span>
        {errors.fName?.message ||
          errors.lName?.message ||
          errors.email?.message ||
          errors.password?.message ||
          errors.confirmPassword?.message}
      </span>
      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("fName", {
          required: true,
        })}
        placeholder="First Name"
      />
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("lName", { required: true })}
        placeholder="Last Name"
      />
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("email", {
          required: true,
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
      <input
        className=" p-2  m-2 no-outline input-style"
        {...register("confirmPassword", {
          required: true,
        })}
        placeholder="Confirm Password"
        type="password"
      />

      <input
        className="p-3 btn btn-info my-3 "
        type="submit"
        value="Create an account"
      />
    </form>
  );
}

const Register = () => {
  const { signInUsingGoogle } = useFirebase();
  const handleGoogleSignIn = () => {
    signInUsingGoogle();
  };

  return (
    <div className="row justify-content-center align-items-center text-center p-0 m-0 my-4">
      <div className="col-10 col-sm-6 col-md-6 col-lg-4 flex-column border border-dark  p-3">
        <p className="fs-4 ">Create an account</p>
        <Form />
        <span>
          Already have an account?
          <span className="mx-2">
            <Link to="/login">Login</Link>
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

export default Register;
