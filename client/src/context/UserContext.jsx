import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { uploadImage } from "../utils/uploadImage";

const userContext = createContext({
  user: null,
  setUser: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export const UserContextPpovider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const user = res.data;
      setUser(user);
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  const signup = async (email, password, fullName, profilePic) => {
    try {
      if (profilePic) {
        const uploadImageRes = uploadImage(profilePic);
      }
      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        email,
        password,
        fullName,
        profilePic,
      });
      const user = res.data;
      setUser(user);
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error in signup", error);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (error) {
      console.log("Error in logout", error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const user = res.data;
      setUser(user);
    } catch (error) {
      console.log("Error in checkAuth", error);
      setUser(null);
      // todo: Handle error, e.g., redirect to login page or show a message
    }
  };
  return (
    <userContext.Provider value={{ user, login, signup, logout, checkAuth }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
