import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Profie from "./Pages/Profie";
import Createpost from "./Pages/Createpost";
import { ToastContainer } from "react-toastify";
import { LoginContext } from "./context/loginContext";
import LogoutModal from "./Modal/LogoutModal";
import UserProfile from "./Components/UserProfile";
import MyFollowing from "./Pages/MyFollowing";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpne, setmodalOpne] = useState(false);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1050742084132-j9bq9adpdkk31hhll0g6libdp68p99bk.apps.googleusercontent.com">
        <LoginContext.Provider value={{ setUserLogin, setmodalOpne }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route exact path="/profile" element={<Profie />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/profile/:_id" element={<UserProfile />} />
            <Route path="/followingpost" element={<MyFollowing />} />
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpne && <LogoutModal />}
        </LoginContext.Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
