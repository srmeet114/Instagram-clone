import React, { useContext } from "react";
import logo from "../../public/Img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiAddBoxFill } from "react-icons/ri";

const Navbar = ({ login }) => {
  const { setmodalOpne } = useContext(LoginContext);
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
            <button
              onClick={() => setmodalOpne(true)}
              className="bg-[#db183c] px-4 py-2 text-white rounded-lg active:bg-[#c71f2f]"
            >
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

  const loginstatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <li key="home" className="px-[15px] py-[1px] font-medium">
          <Link to={"/"}>
            <TiHome className="text-2xl"/>
          </Link>
        </li>,
        <li key="profile" className="px-[15px] py-[1px] font-medium">
          <Link to={"/profile"}>
            <FaUser className="text-xl"/>
          </Link>
        </li>,
        <li key="createPost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/createPost"}><RiAddBoxFill className="text-2xl"/></Link>
        </li>,
        <li key="followingpost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/followingpost"}>
            <MdExplore className="text-2xl"/>
          </Link>
        </li>,
        <li key="" className="px-[15px] py-[1px] font-medium">
          <Link to={""}>
            <button
              onClick={() => setmodalOpne(true)}
              className="bg-[#db183c] px-4 py-2 text-white rounded-lg active:bg-[#c71f2f]"
            >
              <IoIosLogOut className="text-xl"/>
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
    <div className="flex fixed w-full justify-around py-[10px] shadow-lg max-[800px]:py-[0px] max-[800px]:shadow-none bg_bolar max-[800px]:bottom-0 max-[800px]:left-0">

      <Link to={"/"}>
        <img
          className="w-[15%] object-contain max-[500px]:w-[20%] max-[800px]:hidden"
          src={logo}
          alt="logo"
        />
      </Link>
      <ul className="flex items-center list-none max-[800px]:hidden">{loginstatus()}</ul>
      <ul className="hidden items-center list-none max-[800px]:flex w-full justify-evenly">{loginstatusMobile()}</ul>
    </div>
  );
};

export default Navbar;
