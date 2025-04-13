import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUser } from "../../context/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { signup } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    // SIGNUP API call
    signup(email, password, fullName, profilePic);
    // todo: handle error and success response
    navigate("/dashboard");
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl fint-semibold text-black">Create an Account!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full name"
              placeholder="Enter your full name"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary col-span-2">
              SIGNUP
            </button>

            <p className="text-[13px] text-slate-800 mt- 3 ">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
