import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function Form() {
  const [file, setFile] = useState(null);
  // const [url, setURL] = useState("");
  const { getStorage, ref, user, uploadBytesResumable, getDownloadURL, token } =
    useAuth();

  // form validation rules
  const validationSchema = Yup.object().shape({
    // fName: Yup.string().max(40).required("First name is required"),
    // lName: Yup.string().max(40).required("Last name is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function onSubmit(data) {
    console.log(data);

    if (file) {
      const storage = getStorage();
      // const ref = storage.ref(`/images/${user.uid}`);
      const ImagesRef = ref(storage, `images/${uuidv4()}.jpg`);
      const uploadTask = uploadBytesResumable(ImagesRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFile(null);
            const newData = { ...data, img_url: downloadURL };

            fetch(
              `https://murmuring-hollows-32072.herokuapp.com/api/product/add/`,
              {
                method: "post",
                headers: {
                  authorization: `Bearer ${token}`,
                  "content-type": "application/json",
                },
                body: JSON.stringify(newData),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                reset();
                toast.success("Product added successfully");
              })
              .catch((err) => {});
          });
        }
      );
    } else {
      fetch(`https://murmuring-hollows-32072.herokuapp.com/api/product/add/`, {
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          reset();
          toast.success("Product added successfully");
        })
        .catch((err) => {});
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column d-flex">
      <span>
        {errors.fName?.message ||
          errors.lName?.message ||
          errors.email?.message ||
          errors.password?.message ||
          errors.confirmPassword?.message}
      </span>
      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("title", {
          required: true,
        })}
        placeholder="Product title"
      />
      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("price", {
          required: true,
        })}
        placeholder="Price"
      />

      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("rating", {
          required: true,
        })}
        placeholder="Rating"
      />
      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("inventory", {
          required: true,
        })}
        placeholder="Inventory"
      />
      <textarea
        className=" p-2  m-2 no-outline input-style "
        {...register("specification", {
          required: true,
        })}
        placeholder="Specification"
      />
      <textarea
        className=" p-2  m-2 no-outline input-style "
        {...register("description", {
          required: true,
        })}
        placeholder="Description"
      />

      <input
        className=" p-2  m-2 no-outline input-style "
        {...register("img_url")}
        placeholder="image url"
      />
      <span>Or upload image file</span>
      <input
        className=" p-2  m-2 file-upload "
        type="file"
        onChange={handleChange}
      />

      <input className="p-3 btn btn-info my-3 " type="submit" value="submit" />
    </form>
  );
}

const AddProduct = () => {
  return (
    <div className="border col-8 col-sm-4 my-3 text-center">
      <div className="">
        <p className="fs-4 ">Add Product</p>
        <Form />
      </div>
    </div>
  );
};

export default AddProduct;
