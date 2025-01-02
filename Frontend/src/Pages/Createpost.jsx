import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { postShareapi } from "../server/Api/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
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
    postShareapi(body,url,setBody, setImage, setUrl,output,notify,notifyerr,navigate)
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

  return (
    <div className="pt-16 flex justify-center">
      <div className="createPost max-w-[600px] my-[10px] border border-[rgb(173,173,173)] rounded-lg">
        {/* Header */}
        <div className="post-header flex justify-between items-center px-[10px]">
          <p className="text-xl mx-4 font-semibold">Create New Post</p>
          <button
            onClick={uploadImage}
            className="text-[#339ce3] font-semibold"
          >
            Share
          </button>
        </div>

        {/* Image Upload */}
        <div className="main-div border-t border-[rgb(173,173,173)] py-2">
          <img
            className="w-[300px] mt-[5px]"
            src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
            id="output"
            alt=""
          />
          <input
            name="image"
            className="mt-2"
            type="file"
            accept="image/*"
            onChange={loadFile}
          />
        </div>

        {/* Post Details */}
        <div className="details border-t border-[rgb(173,173,173)]">
          <div className="card-header flex items-center">
            <div className="card-pic">
              <img
                className="rounded-full w-[30px] h-[auto] p-[5px] object-contain"
                src="https://images.unsplash.com/photo-1692261853713-4d283f65a6ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <p>Ramesh</p>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-[90%] mx-3 p-2"
            type="text"
            placeholder="Write a caption..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
