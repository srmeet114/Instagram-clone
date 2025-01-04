import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdClose, MdMood } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeletePost, postComment } from "../server/Api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostDetail = ({ itemsData, ClosetComment, userData, setsow }) => {
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const navigate = useNavigate();

  const RemovePost = (_id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      DeletePost(_id, notify, notifyerr, navigate, ClosetComment);
    }
  };

  return (
    <div className="showComment w-screen min-h-screen fixed top-0 left-0 bg-[rgba(16,13,13,0.4)]">
      <div className="contauner flex w-4/5 bg-white absolute top-[10%] left-[10%] h-[500px] overflow-hidden max-[600px]:flex-col">
        <div className="postPic bg-black flex items-center max-[600px]:h-1/2 max-[600px]:justify-center">
          <img
            className="object-contain w-full max-[600px]:w-auto h-full"
            src={itemsData.photo}
            alt=""
          />
        </div>
        <div className="datails w-full h-[inherit] flex flex-col">
          <div className="flex items-center justify-between border-b">
            <div className="flex items-center">
              <img
                className="rounded-full w-[30px] h-[auto] p-[5px] object-contain"
                src={userData.Photo}
                alt=""
              />
              <p className="text-lg p-[11px]">{userData.name}</p>
            </div>
            <div className="mr-5 flex items-center">
              <RiDeleteBin6Fill
                onClick={() => RemovePost(itemsData._id)}
                className="text-2xl"
              />
              <div className="ml-3">
                <MdClose onClick={() =>setsow(false)} className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="comment-section flex-grow-[4] h-10 overflow-y-auto">
            {itemsData.comments.map((e, index) => {
              return (
                <p key={index} className="comm p-3">
                  <span className="commenter font-bold">
                    {e.postedBy.name}{" "}
                  </span>
                  <span className="commenttext">{e.comment}</span>
                </p>
              );
            })}
          </div>
          <div className="line-[4px] px-[10px] py-[3px] border-b border-[rgb(173,173,173)] ">
            <p>{itemsData.likes.length} like</p>
            <p>{itemsData.body}</p>
          </div>
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MdMood className="text-2xl" />
              <input
                className="outline-none p-[10px] w-full"
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
              className="font-medium px-3 text-[#63afe3]"
            >
              Post
            </button>
          </div> */}
        </div>
      </div>
      <div className="close-comment fixed top-[3%] right-[5%]">
        <button
          onClick={() => ClosetComment()}
          className="text-white text-2xl font-bold cursor-pointer"
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
