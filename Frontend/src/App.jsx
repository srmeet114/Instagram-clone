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

function App() {

  const [userLogin, setUserLogin] = useState(false)
  const [modalOpne, setmodalOpne] = useState(false)

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{setUserLogin,setmodalOpne}}>
        <Navbar login={userLogin}/>
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
        {modalOpne && <LogoutModal/>}
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
