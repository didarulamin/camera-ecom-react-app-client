import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.init";

//firebase init function
const initializeAuthentication = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuthentication;
