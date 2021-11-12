import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getIdToken,
} from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

// Create a root reference

initializeAuthentication();

//use firebase hook
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [adminLoading, setadminLoading] = useState(true);
  const [admin, setAdmin] = useState({});
  const [, forceUpdate] = useState(0);
  const [token, setToken] = useState("");
  const auth = getAuth();
  const [buyNowCart, setBuyNowCart] = useState([]);
  const [cart, setCart] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("cartItems");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // console.log(token)

  useEffect(() => {
    // storing input name
    window.localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart.length]);

  const displayInitials = () => {
    const nameInitials =
      user?.displayName?.split(" ")[0][0] + user?.displayName?.split(" ")[1][0];
    return nameInitials;
  };

  const signInUsingEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInUsingGoogle = (redirect_uri, history) => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        // The signed-in user info.
        const user = result.user;
        saveUser(user.email, user.displayName, user.uid, "PUT");
        history.push(redirect_uri);
        // ...
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
        // ...
      })
      .finally(() => setIsLoading(false));
  };

  // observe user state change

  const registerNewUser = ({ email, password, fName, lName }) => {
    const username = fName + " " + lName;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast("Success", { type: "success" });
        // const user = result.user;
        verifyEmail();
        setUserName(username);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
  };

  const setUserName = (name) => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {
      setUser(auth.currentUser);
      const user = auth.currentUser;
      saveUser(user.email, user.displayName, user.uid, "POST");
    });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {});
  };

  const handleResetPassword = ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  //check user role for admin
  useEffect(() => {
    setadminLoading(true);
    axios
      .get(
        `https://murmuring-hollows-32072.herokuapp.com/api/user/role/${user.email}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.role === "admin") {
          setAdmin(user);
          setadminLoading(false);
        }
        // setAdmin(user);
      });
  }, [user.email]);

  // observe user state change
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setAdmin({});
      })
      .finally();
  };

  const saveUser = (email, displayName, uid, method) => {
    const user = { email, displayName, uid };
    fetch("https://murmuring-hollows-32072.herokuapp.com/api/users/add", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then()
      .catch((error) => {});
  };

  return {
    user,
    signInUsingGoogle,
    logOut,
    setUser,
    isLoading,
    setIsLoading,
    signInUsingEmailAndPassword,
    createUserWithEmailAndPassword,
    registerNewUser,
    handleResetPassword,
    admin,
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    updateProfile,
    auth,
    displayInitials,
    token,
    forceUpdate,
    cart,
    setCart,
    adminLoading,
    setadminLoading,
    buyNowCart,
    setBuyNowCart,
  };
};

export default useFirebase;
