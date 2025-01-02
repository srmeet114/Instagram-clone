import React, { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const navigate = useNavigate()
  const {setmodalOpne} = useContext(LoginContext)
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen z-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="modal w-[250px] h-[175px] bg-white z-60 rounded-lg shadow-lg relative">
        <div className="modalheader h-[50px] bg-gray-100 rounded-t-lg">
          <h2 className="p-[10px] text-[#2c3e50] font-semibold text-[18px] text-center">
            Confirm
          </h2>
        </div>
        <button onClick={()=>setmodalOpne(false)} className="closebtn font-semibold px-[8px] py-[4px] rounded-lg text-[18px] text-white bg-blue-600 absolute transition duration-300 right-[7px] top-[7px] shadow-lg hover:bg-blue-700">
          ✖
        </button>
        <div className="modalcontent p-[10px] text-[14px] text-[#2c3e50] text-center">
          Are you really want to log out?
        </div>
        <div className="modalactions mt-[30px] flex justify-around items-center">
          <button onClick={()=>{setmodalOpne(false), localStorage.clear(), navigate("/signin")}} className="font-semibold px-[20px] py-[10px] rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-300">
            Log Out
          </button>
          <button onClick={()=>setmodalOpne(false)} className="font-semibold px-[20px] py-[10px] rounded-lg text-white bg-gray-700 hover:bg-gray-800 transition duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
