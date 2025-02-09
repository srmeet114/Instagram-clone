import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState,Suspense, lazy, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { LoginContext } from "./context/loginContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DarkLiteProvider } from "./context/DarkLiteContext";
import Insta from "../public/Img/insta_icon.png";

const Home = lazy(() => import("./Pages/Home"));
const Navbar = lazy(() => import("./Components/Navbar"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const Profie = lazy(() => import("./Pages/Profie"));
const Createpost = lazy(() => import("./Pages/Createpost"));
const UserProfile = lazy(() => import("./Components/UserProfile"));
const MyFollowing = lazy(() => import("./Pages/MyFollowing"));
const LogoutModal = lazy(() => import("./Modal/LogoutModal"));
const LiveChate = lazy(() => import("./Pages/LiveChate"));


const Loader = () => (
  <div className="h-screen flex items-center justify-center bg-black">
    <img className="w-24" src={Insta} alt="" />
  </div>
);

function App() {
  const [userLogin, setUserLogin] = useState(false); // state for login
  const [modalOpne, setmodalOpne] = useState(false); // modal opne for logout
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {isLoading ? (
        <Loader />
      ) : (
      <BrowserRouter>
        <GoogleOAuthProvider clientId="1050742084132-j9bq9adpdkk31hhll0g6libdp68p99bk.apps.googleusercontent.com">
          <LoginContext.Provider value={{ setUserLogin, setmodalOpne }}>
            <DarkLiteProvider>
            <Navbar login={userLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route exact path="/profile" element={<Profie />} />
              <Route path="/createPost" element={<Createpost />} />
              <Route path="/profile/:_id" element={<UserProfile />} />
              <Route path="/followingpost" element={<MyFollowing />} />
              <Route path="/LiveChate" element={<LiveChate />} />
            </Routes>
            <ToastContainer theme="dark" /> {/* notification react-toastify */}
            {modalOpne && <LogoutModal />}
            </DarkLiteProvider>
          </LoginContext.Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>)}
    </Suspense>
  );
}

export default App;
