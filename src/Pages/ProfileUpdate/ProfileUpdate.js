import React, { useState } from "react";
// import useFirebase from "../../hooks/useFirebase";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function UpdateForm() {
  const [file, setFile] = useState(null);
  // const [url, setURL] = useState("");
  const {
    getStorage,
    ref,
    user,
    uploadBytesResumable,
    getDownloadURL,
    updateProfile,
    auth,
    forceUpdate,
  } = useAuth();

  // form validation rules
  const validationSchema = Yup.object().shape({
    fName: Yup.string().max(40).required("First name is required"),
    lName: Yup.string().max(40).required("Last name is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function onSubmit(data) {
    console.log(data);

    const storage = getStorage();
    // const ref = storage.ref(`/images/${user.uid}`);
    const ImagesRef = ref(storage, `images/${user.uid}${new Date()}.jpg`);
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
          const newData = { ...data, image: downloadURL };

          const { image, fName, lName } = newData;

          const fullName = `${fName} ${lName}`;
          console.log(newData, fullName);
          if (file) {
            updateProfile(auth.currentUser, {
              displayName: fullName,
              photoURL: image,
            })
              .then((result) => {
                toast("Success", { type: "success" });
                reset();

                forceUpdate((n) => !n);
                console.log(user.displayName);
              })
              .catch((err) => {
                toast(err.message, { type: "error" });
              });
          } else {
            updateProfile(auth.currentUser, {
              displayName: fullName,
            })
              .then((result) => {
                toast("Success", { type: "success" });
                reset();

                console.log(user.displayName);
                forceUpdate((n) => !n);
              })
              .catch((err) => {
                toast(err.message, { type: "error" });
              });
          }
        });
      }
    );
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column d-flex">
      <span>{errors.fName?.message || errors.lName?.message}</span>
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
        className=" p-2  m-2 file-upload "
        type="file"
        onChange={handleChange}
      />

      <input className="p-3 btn btn-info my-3 " type="submit" value="update" />
    </form>
  );
}

const ProfileUpdate = () => {
  return (
    <div className="row justify-content-center align-items-center text-center p-0 m-0 my-4">
      <div className="col-10 col-sm-6 col-md-6 col-lg-4 flex-column border border-dark  p-3">
        <p className="fs-4 ">Update profile</p>
        <UpdateForm />
      </div>
    </div>
  );
};

export default ProfileUpdate;
