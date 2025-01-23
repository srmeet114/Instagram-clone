import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import logo from "../../public/Img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogins, postSignUpData } from "../server/Api/api";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../context/loginContext";

const SignUp = () => {
  const {setUserLogin} = useContext(LoginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    postSignUpData(data, reset, notify, notifyerr, navigate);
  };

  const continueWithGoogle = (credentialResponse) => {
    const jwtDetail = jwtDecode(credentialResponse.credential);
    
    GoogleLogins(jwtDetail,setUserLogin,notify,notifyerr,navigate,credentialResponse)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#121212] dark:to-[#121212] transition duration-300">
      <section>
        <div className="h-lvh flex pt-20">
          <div className="container mx-auto max-[608px]:px-5">
            <div className="form-signin m-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-lg border border-white border-opacity-20 dark:bg-[#1e1e1f] py-4 px-6 w-1/3 max-[768px]:w-1/2 max-[608px]:w-full max-[425px]:border-0 shadow-lg transition duration-300">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center mb-4">
                  <img
                    className="w-[40%] object-contain py-10 dark:filter dark:invert dark:brightness-0 transition duration-300"
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Full Name is required" })}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("userName", {
                      required: "Username is required",
                    })}
                    className={`w-full border ${
                      errors.userName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="text-center text-sm text-gray-500 mt-2 dark:text-white">
                  <p>
                    By signing up, you agree to our
                    <a className="text-blue-500 hover:underline pl-1">Terms</a>,
                    <a className="text-blue-500 hover:underline pr-1">
                      Privacy Policy
                    </a>
                    and
                    <a className="text-blue-500 hover:underline pl-1">
                      Cookies Policy
                    </a>
                    .
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4cb5f9] hover:bg-[#0b5ed7] text-white rounded-md transition duration-300 py-2 mt-4"
                >
                  Sign up
                </button>
              </form>
            </div>
            <div className="form-signin m-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-lg border border-white border-opacity-20 dark:bg-[#1e1e1f] py-4 px-6 w-1/3 max-[768px]:w-1/2 max-[608px]:w-full max-[425px]:border-0 shadow-lg transition duration-300 mt-4">
              <p className="text-center text-sm text-gray-500 dark:text-white">
                Have an account ?
                <Link
                  to="/signin"
                  className="text-blue-500 hover:underline pl-1"
                >
                  Sign In
                </Link>
              </p>
              <div className="flex justify-center mt-3">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    continueWithGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
