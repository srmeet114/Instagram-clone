import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { postShareapi } from "../server/Api/api";
import { useNavigate } from "react-router-dom";
import UplodImg from "../../public/Img/uplod.png";
import { TbSend } from "react-icons/tb";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      postShare();
    }
  }, [url]);

  const uploadImage = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }
    setIsPosting(true)
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

  const postShare = () => {
    const output = document.getElementById("output");
    postShareapi(
      body,
      url,
      setBody,
      setImage,
      setUrl,
      output,
      notify,
      notifyerr,
      navigate,
      UplodImg,setIsPosting
    );
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const output = document.getElementById("output");
    output.src = URL.createObjectURL(file);
    output.onload = () => {
      URL.revokeObjectURL(output.src); // Free memory
    };
    setImage(file);
  };

  const hindFileinput = useRef(null);

  const handleClick = () => {
    hindFileinput.current.click();
  };

  return (
    <div className="pt-16 max-[800px]:pt-8 flex justify-center">
      <div className="createPost w-full max-w-[500px] mx-auto my-5 border border-gray-300 rounded-lg shadow-md bg-white">
        {/* Header */}
        <div className="post-header flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <p className="text-lg font-semibold text-gray-700">Create New Post</p>
        </div>

        {/* Image Upload */}
        <div className="main-div py-4 flex flex-col items-center">
          <img
            onClick={handleClick}
            className="w-[300px] h-[300px] object-cover rounded-md cursor-pointer"
            src={UplodImg}
            id="output"
            alt="Upload"
          />
          <input
            name="image"
            ref={hindFileinput}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={loadFile}
          />
          <p className="mt-2 text-sm text-gray-500">
            Click the image to upload
          </p>
        </div>

        {/* Post Details */}
        <div className="details px-4 py-3">
          <div className="card-header flex items-center space-x-3 mb-3">
            <img
              className="rounded-full w-10 h-10 object-cover"
              src="https://images.unsplash.com/photo-1692261853713-4d283f65a6ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
            />
            <p className="text-sm font-medium text-gray-700">Ramesh</p>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none text-gray-700"
            rows="3"
            placeholder="Write a caption..."
          ></textarea>
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
            <button
              onClick={uploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors flex items-center"
              disabled={isPosting}
            >
              {isPosting ? (
                <div className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <TbSend className="w-4 h-4 mr-2" />
                  Share Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
