import React, { useContext } from "react";
import logo from "../../public/Img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";

const Navbar = ({ login }) => {
  const {setmodalOpne} = useContext(LoginContext)
  const loginstatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <li key="profile" className="px-[15px] py-[1px] font-medium">
          <Link to={"/profile"}>Profile</Link>
        </li>,
        <li key="createPost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/createPost"}>Create Post</Link>
        </li>,
        <li key="followingpost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/followingpost"}>My Following</Link>
        </li>,
        <li key="" className="px-[15px] py-[1px] font-medium">
        <Link to={""}>
        <button onClick={()=>setmodalOpne(true)} className="bg-[#db183c] px-4 py-2 text-white rounded-lg active:bg-[#c71f2f]">
          LogOut
        </button>
          </Link>
      </li>,
      ];
    } else {
      return [
        <li key="signup" className="px-[15px] py-[1px] font-medium">
          <Link to={"/signup"}>SignUp</Link>
        </li>,
        <li key="Signin" className="px-[15px] py-[1px] font-medium">
          <Link to={"/Signin"}>SignIn</Link>
        </li>,
      ];
    }
  };

  return (
    <div className="flex fixed w-full justify-around py-[10px] shadow-lg bg_bolar">
      <Link to={"/"}>
        <img
          className="w-[15%] object-contain max-[500px]:w-[20%]"
          src={logo}
          alt="logo"
        />
      </Link>
      <ul className="flex items-center list-none">{loginstatus()}</ul>
    </div>
  );
};

export default Navbar;
