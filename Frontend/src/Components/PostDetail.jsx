import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdClose, MdMood } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeletePost, postComment } from "../server/Api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostDetail = ({ itemsData, ClosetComment, userData, setsow }) => {
  const userimg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const [comment, setcomment] = useState("");
  const navigate = useNavigate();

  const RemovePost = (_id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      DeletePost(_id, notify, notifyerr, navigate, ClosetComment);
    }
  };

  const [Gpostsdata, setGpostsdata] = useState([]);

  const makeComment = (text, id) => {
    console.log(text, id);
    
      // postComment(
      //   text,
      //   id,
      //   setcomment,
      //   Gpostsdata,
      //   setGpostsdata,
      //   notify,
      //   notifyerr
      // );
    };

  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 bg-[rgba(16,13,13,0.4)] z-10 overflow-auto">
              <div className="container flex flex-col sm:flex-row w-[80%] absolute top-[10%] left-[10%] h-auto sm:h-[80%] overscroll-contain bottom-0">
                {/* Image Section */}
                <div className="w-full sm:w-[40%] h-[30%] sm:h-full flex items-center justify-center bg-black">
                  <img
                    className="object-contain w-auto h-full lg:w-full"
                    src={itemsData.photo}
                    alt=""
                  />
                </div>
                {/* Content Section */}
                <div className="w-full sm:w-[60%] h-auto sm:h-full flex flex-col bg-white dark:bg-[#121212] transition duration-300">
                  {/* Header Section */}
                  <div className="flex items-center justify-between border-b px-3 py-2">
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-[40px] h-[40px] p-[5px] object-contain"
                        src={userData.Photo || userimg}
                        alt=""
                      />
                      <p className="text-lg ml-3 dark:text-white transition duration-300">{userData.name}</p>
                    </div>
                    <RiDeleteBin6Fill
                      onClick={() => RemovePost(itemsData._id)}
                      className="text-2xl text-red-500 cursor-pointer"
                    />
                  </div>
    
                  {/* Comments Section */}
                  <div className="comment-section flex-grow overflow-y-auto h-36 px-3 py-2">
                    {itemsData.comments.map((e, index) => (
                      <p key={index} className="comm p-2 border-b last:border-none">
                        <span className="commenter font-bold dark:text-white transition duration-300">
                          {e.postedBy.name}{" "}
                        </span>
                        <span className="commenttext text-white transition duration-300">{e.comment}</span>
                      </p>
                    ))}
                  </div>
    
                  {/* Info Section */}
                  <div className="px-3 py-2 border-t border-gray-300">
                    <p className="dark:text-white transition duration-300">{itemsData.likes.length} like(s)</p>
                    <p className="dark:text-white transition duration-300">{itemsData.body}</p>
                  </div>
                </div>
              </div>
    
              <div className="fixed top-[3%] right-[5%]">
                <button
                  onClick={() => setsow(false)}
                  className="text-white text-2xl font-bold cursor-pointer"
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>
  );
};

export default PostDetail;
