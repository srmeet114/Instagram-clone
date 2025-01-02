import React, { useEffect, useRef, useState } from 'react'
import { postPic } from '../server/Api/api'

const ProfilePic = ({close}) => {
  const hindFileinput = useRef(null)

  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  
  const uploadImage = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "coldcloud");

    fetch("https://api.cloudinary.com/v1_1/coldcloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.error("Error uploading image:", err));
  };

  useEffect(()=>{
    if(image){
      uploadImage()
    }
  },[image])

  useEffect(()=>{
    if(url){
      postPics()
    }
  },[url])

  const postPics = () =>{
    postPic(url,close)
  }
  

  const handleClick = () =>{
    hindFileinput.current.click()
  }

  return (
    <div className='bg-black bg-opacity-20 w-screen h-screen z-50 fixed top-0 left-0 flex justify-center items-center'>
      <div className="modal w-[350px] h-[180px] bg-white z-60 rounded-lg shadow-lg relative">
        <div className="py-5">
          <p className='text-center text-xl font-medium'>Chnage Profile Photo</p>
        </div>
        <div className="text-center border-y">
          <button onClick={handleClick} className='text-lg text-[#1EA1F7] py-1 font-medium hover:bg-[#f2f2f2] w-full transition duration-300 ease-in-out active:bg-[#dcdcdc]'>Upload Photo</button>
          <input type="file" ref={hindFileinput} accept='image/*' onChange={(e)=>{setImage(e.target.files[0])}} className='hidden' />
        </div>
        <div className="text-center text-[#ED4956]">
          <button onClick={()=>{setUrl(null),postPics()}} className='text-lg py-1 font-medium hover:bg-[#f2f2f2] w-full transition duration-300 ease-in-out active:bg-[#dcdcdc]'>Remover Current Photo</button>
        </div>
        <div className="text-center border-t">
          <button onClick={close} className='text-lg py-1 font-medium hover:bg-[#f2f2f2] w-full transition duration-300 ease-in-out active:bg-[#dcdcdc]'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePic
