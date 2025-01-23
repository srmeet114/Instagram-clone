import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdMood } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  GetFollowingPost,
  likePost,
  postComment,
  unlikePost,
} from "../server/Api/api";
import { CiHeart } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const MyFollowing = () => {
  const userimg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const navigate = useNavigate();
  useEffect(() => {
    const tokeen = localStorage.getItem("jwt");
    if (!tokeen) {
      navigate("/signin");
    }
  }, []);

  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const [Gpostsdata, setGpostsdata] = useState([]);
  const [comment, setcomment] = useState("");
  const [OpneComment, setOpneComment] = useState(false);
  const [itemsData, setitemsData] = useState([]);

  const OpnetComment = (e) => {
    setOpneComment(true);
    setitemsData(e);
  };

  const ClosetComment = () => {
    setOpneComment(false);
  };

  useEffect(() => {
    GetPost();
  }, []);

  const GetPost = () => {
    GetFollowingPost(setGpostsdata);
  };

  const likesPost = (id) => {
    likePost(id, Gpostsdata, setGpostsdata);
  };

  const unlinkPost = (id) => {
    unlikePost(id, Gpostsdata, setGpostsdata);
  };

  const makeComment = (text, id) => {
    postComment(
      text,
      id,
      setcomment,
      Gpostsdata,
      setGpostsdata,
      notify,
      notifyerr
    );
  };
  return (
    <div className="pt-16 max-[800px]:pt-12 flex flex-col items-center dark:bg-[#121212] transition duration-300">
      {Gpostsdata.map((e, index) => {
        return (
          <div
            key={index}
            className="w-[500px] max-w-full sm:w-[500px] sm:mx-auto h-max border dark:border-[#1e1e1f] rounded-lg my-3 dark:bg-[#1e1e1f] transition duration-300"
          >
            <div className="flex items-center px-3">
              <div>
                <img
                  className="rounded-full w-[30px] h-[auto] m-[5px] object-contain"
                  src={e.postedBy.Photo ? e.postedBy.Photo : userimg}
                  alt=""
                />
              </div>
              <p className="text-lg p-[11px] dark:text-white transition duration-300">
                <Link to={`/profile/${e.postedBy._id}`}>{e.postedBy.name}</Link>
              </p>
            </div>
            <div className=" flex justify-center">
              <img src={e.photo} alt="" />
            </div>
            <div className="line-[4px] px-[10px] py-[3px] border-b border-[rgb(173,173,173)] dark:text-white transition duration-300">
              <div className="flex">
                <div className="">
                  {e.likes.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                  ) ? (
                    <FcLike
                      onClick={() => {
                        unlinkPost(e._id);
                      }}
                      className="text-xl cursor-pointer"
                    />
                  ) : (
                    <CiHeart
                      onClick={() => {
                        likesPost(e._id);
                      }}
                      className="text-xl cursor-pointer"
                    />
                  )}
                  <p className="flex">{e.likes.length} like</p>
                </div>
                <div className="">
                  <p
                    className="cursor-pointer pt-1"
                    onClick={() => OpnetComment(e)}
                  >
                    <FaRegComment />
                  </p>
                </div>
              </div>
              <p>{e.body}</p>
              <p></p>
              <p
                onClick={() => OpnetComment(e)}
                className="font-semibold cursor-pointer"
              >
                View All comnents
              </p>
            </div>
            <div className="grid grid-cols-4 px-3">
              <div className="flex items-center col-span-3">
                <MdMood className="text-2xl dark:text-white transition duration-300" />
                <input
                  className="outline-none p-[10px] w-full bg-transparent dark:text-white"
                  type="text"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  placeholder="Add a comment..."
                />
              </div>
              <button
                onClick={() => makeComment(comment, e._id)}
                className="font-medium px-3 text-[#63afe3] text-right"
              >
                Post
              </button>
            </div>
          </div>
        );
      })}
      {OpneComment && (
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
                    src={
                      itemsData.postedBy.Photo
                        ? itemsData.postedBy.Photo
                        : userimg
                    }
                    alt=""
                  />
                  <p className="text-lg ml-3 dark:text-white transition duration-300">{itemsData.postedBy.name}</p>
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
                    <span className="commenter font-bold dark:text-white  ">
                      {e.postedBy.name}{" "}
                    </span>
                    <span className="commenttext dark:text-white">{e.comment}</span>
                  </p>
                ))}
              </div>

              {/* Info Section */}
              <div className="px-3 py-2 border-t border-gray-300">
                <p className="dark:text-white transition duration-300">{itemsData.likes.length} like(s)</p>
                <p className="dark:text-white transition duration-300">{itemsData.body}</p>
              </div>
              <div className="grid grid-cols-4 px-3">
                <div className="flex items-center col-span-3">
                  <MdMood className="text-2xl dark:text-white transition duration-300" />
                  <input
                    className="outline-none p-[10px] w-full bg-transparent dark:text-white"
                    type="text"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Add a comment..."
                  />
                </div>
                <button
                  onClick={() => {
                    makeComment(comment, itemsData._id), ClosetComment();
                  }}
                  className="font-medium px-3 text-[#63afe3] text-right"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="fixed top-[3%] right-[5%]">
            <button
              onClick={() => ClosetComment()}
              className="text-white text-2xl font-bold cursor-pointer"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFollowing;
