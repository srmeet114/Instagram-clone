import React, { useContext } from "react";
import logo from "../../public/Img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdDarkMode, MdExplore, MdSunny } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiAddBoxFill } from "react-icons/ri";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useDarkLite } from "../context/DarkLiteContext";

const Navbar = ({ login }) => {
  const { isDarkMode, toggleDarkMode } = useDarkLite();
  const { setmodalOpne } = useContext(LoginContext);
  const loginstatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <li key="button">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded text-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {isDarkMode ? <MdSunny /> : <MdDarkMode />}
          </button>
        </li>,
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
        <li key="button">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded text-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {isDarkMode ? <MdSunny /> : <MdDarkMode />}
          </button>
        </li>,
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
            <TiHome className="text-2xl" />
          </Link>
        </li>,
        <li key="LiveChate" className="px-[15px] py-[1px] font-medium">
          <Link to={"/LiveChate"}>
            <BiSolidMessageRounded className="text-2xl" />
          </Link>
        </li>,
        <li key="createPost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/createPost"}>
            <RiAddBoxFill className="text-2xl" />
          </Link>
        </li>,
        <li key="followingpost" className="px-[15px] py-[1px] font-medium">
          <Link to={"/followingpost"}>
            <MdExplore className="text-2xl" />
          </Link>
        </li>,
        <li key="profile" className="px-[15px] py-[1px] font-medium">
          <Link to={"/profile"}>
            <FaUser className="text-xl" />
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="Signin" className="px-[15px] py-[1px] font-medium">
          <Link to={"/Signin"}>SignIn</Link>
        </li>,
        <li key="signup" className="px-[15px] py-[1px] font-medium">
          <Link to={"/signup"}>SignUp</Link>
        </li>,
      ];
    }
  };

  const loginstatusMobile_header = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <Link to={"/"} className="flex">
          <img
            className="w-[25%] object-contain max-[580px]:w-[25%] max-[500px]:w-[30%] max-[425px]:w-[40%] max-[375px]:w-[35%] dark:filter dark:invert dark:brightness-0 transition duration-300"
            src={logo}
            alt="logo"
          />
        </Link>,
        <div className="py-[1px] font-medium flex">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {isDarkMode ? <MdSunny /> : <MdDarkMode />}
          </button>
          <Link to={""}>
            <button
              onClick={() => setmodalOpne(true)}
              className="bg-[#db183c] dark:bg-[#a73333] px-4 py-2 text-white rounded-lg active:bg-[#c71f2f]"
            >
              <IoIosLogOut className="text-xl" />
            </button>
          </Link>
        </div>,
      ];
    } else {
      return [
        <Link to={"/"} className="flex">
          <img
            className="w-[25%] object-contain max-[580px]:w-[25%] max-[500px]:w-[30%] max-[425px]:w-[40%] max-[375px]:w-[35%] dark:filter dark:invert dark:brightness-0 transition duration-300"
            src={logo}
            alt="logo"
          />
        </Link>,
        <div className="py-[1px] font-medium flex">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {isDarkMode ? <MdSunny /> : <MdDarkMode />}
          </button>
        </div>,
      ];
    }
  };

  return (
    <div className="">
      <div className="hidden max-[800px]:flex justify-between fixed bg-white dark:bg-[#1e1e1f] bg-opacity-80 backdrop-blur-sm rounded-b-lg border border-white border-opacity-20 max-[800px]:top-0 max-[800px]:left-0 w-full px-5 py-2 transition duration-300 z-10">
        {loginstatusMobile_header()}
      </div>
      <div className="grid grid-cols-3 fixed w-full py-[10px] shadow-lg max-[800px]:py-[0px] max-[800px]:shadow-none bg-white dark:bg-[#1e1e1f] bg-opacity-80 backdrop-blur-sm rounded-t-lg border border-white border-opacity-20 max-[800px]:bottom-0 max-[800px]:left-0 z-10 transition duration-300">
        <Link className="flex items-center ps-5" to={"/"}>
          <img
            className="h-[2rem] object-contain max-[500px]:w-[20%] max-[800px]:hidden dark:filter dark:invert dark:brightness-0 transition duration-300"
            src={logo}
            alt="logo"
          />
        </Link>
        <ul className="col-span-2 flex justify-end items-center w-full list-none max-[800px]:hidden dark:text-white transition duration-300">
          {loginstatus()}
        </ul>
        <ul className="hidden col-span-3 items-center list-none max-[800px]:flex w-full justify-evenly py-2 dark:text-white">
          {loginstatusMobile()}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
