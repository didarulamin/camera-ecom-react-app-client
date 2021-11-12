import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

//auth hooks
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
