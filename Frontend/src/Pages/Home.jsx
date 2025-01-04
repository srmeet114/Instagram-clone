import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdMood } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GetPosts, likePost, postComment, unlikePost } from "../server/Api/api";
import { CiHeart } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Home = () => {
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
  console.log("🚀 ~ Home ~ Gpostsdata:", Gpostsdata)
  const [comment, setcomment] = useState("");
  const [OpneComment, setOpneComment] = useState(false);
  const [itemsData, setitemsData] = useState([]);
  console.log(itemsData);
  
  const limit = 10;
  const skip = 0;

  const OpnetComment = (e) => {
    setOpneComment(true);
    setitemsData(e);
  };

  const ClosetComment = () => {
    setOpneComment(false);
  };

  useEffect(() => {
    GetPost();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const GetPost = () => {
    GetPosts(Gpostsdata, setGpostsdata, limit, skip);
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      skip = skip + 10;
      GetPost();
    }
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
    <div className="pt-16 max-[800px]:pt-0 flex flex-col items-center">
      {Gpostsdata.map((e, index) => {
        return (
          <div
            key={index}
            className="w-[500px] max-w-full sm:w-[500px] sm:mx-auto h-max border rounded-lg my-3 px-3"
          >
            <div className="flex items-center">
              <div>
                <img
                  className="rounded-full w-[30px] h-[auto] m-[5px] object-contain"
                  src={e.postedBy.Photo ? e.postedBy.Photo : userimg}
                  alt=""
                />
              </div>
              <p className="text-lg p-[11px]">
                <Link to={`profile/${e.postedBy._id}`}>{e.postedBy.name}</Link>
              </p>
            </div>
            <div className=" flex justify-center">
              <img src={e.photo} alt="" />
            </div>
            <div className="line-[4px] px-[10px] py-[3px] border-b border-[rgb(173,173,173)]">
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
              <p>{e.body}</p>
              <p></p>
              <p
                onClick={() => OpnetComment(e)}
                className="font-bold cursor-pointer"
              >
                View All comnents
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MdMood className="text-2xl" />
                <input
                  className="outline-none p-[10px]"
                  type="text"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  placeholder="Add a comment..."
                />
              </div>
              <button
                onClick={() => makeComment(comment, e._id)}
                className="font-medium px-3 text-[#63afe3]"
              >
                Post
              </button>
            </div>
          </div>
        );
      })}
      {OpneComment && (
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
                  <div>
                    <img
                      className="rounded-full w-[30px] h-[auto] p-[5px] object-contain"
                      src={itemsData.postedBy.Photo ? itemsData.postedBy.Photo : userimg}
                      alt=""
                    />
                  </div>
                  <p className="text-lg p-[11px]">{itemsData.postedBy.name}</p>
                </div>
                <button
                  onClick={() => ClosetComment()}
                  className=" text-2xl font-bold cursor-pointer pr-3"
                >
                  <IoCloseSharp />
                </button>
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
              <div className="flex justify-between items-center">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
