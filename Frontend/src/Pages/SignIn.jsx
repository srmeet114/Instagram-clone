import React, { useContext, useState } from "react";
import logo from "../../public/Img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postSignInData } from "../server/Api/api";
import { toast } from "react-toastify";
import { LoginContext } from "../context/loginContext";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    postSignInData(
      data,
      reset,
      notify,
      notifyerr,
      navigate,
      setUserLogin,
      setIsLoading
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#121212] dark:to-[#121212] transition duration-300">
      <section>
        <div className="h-lvh flex pt-20 ">
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
                <div className="space-y-4 mt-4">
                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* Password Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Password"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4cb5f9] hover:bg-[#0b5ed7] text-white rounded-md transition duration-300 py-2 mt-4 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
            <div className="form-signin m-auto border dark:border-[#1e1e1f] border-gray-300 rounded-md p-4 w-1/3 max-[768px]:w-1/2 max-[608px]:w-full max-[425px]:w-full mt-4 bg_bolar dark:bg-[#1e1e1f] transition duration-300">
              <p className="text-center text-sm dark:text-white">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-500 hover:underline pl-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
