import React, { useEffect, useRef, useState } from "react";
import { GetProfie } from "../server/Api/api";
import PostDetail from "../Components/PostDetail";
import ProfilePic from "../Modal/ProfilePic";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";

const Profie = () => {
  const userimg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    GetProfieData();
  }, []);

  const [sow, setsow] = useState(false);
  const [post, setpost] = useState([]);
  const [post_one, setpost_one] = useState([]);
  const [user, setuser] = useState("");
  const [changePic, setchangePic] = useState(false);

  const OpnePostDetails = (e) => {
    setsow(true);
    setpost_one(e);
  };

  const ClosePostDetails = () => {
    setsow(false);
    window.location.reload();
  };

  const ChnageProfileOpne = () => {
    setchangePic(true);
  };

  const ChnageProfileClose = () => {
    setchangePic(false);
  };

  const GetProfieData = () => {
    GetProfie(setpost, setuser, ChnageProfileClose);
  };

  return (
    <div className="h-full dark:bg-[#121212] transition duration-300 pb-5">
      <div className="pt-16 max-[425px]:pt-8 flex justify-center">
        <div className="max-w-[600px] h-max border rounded-lg my-5 dark:bg-[#1e1e1f] transition duration-300">
          <div className="flex justify-around p-5">
            <div className="h-fit cursor-pointer">
              <img
                onClick={ChnageProfileOpne}
                className="w-[150px] h-[150px] max-[425px]:w-[120px] max-[425px]:h-[120px] object-contain rounded-full "
                src={user.Photo ? user.Photo : userimg}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-around dark:text-white transition duration-300">
              <h2 className="text-4xl font-semibold text-center">
                {JSON.parse(localStorage.getItem("user")).name}
              </h2>
              <div className="flex">
                <p className="px-2 font-medium">
                  {post ? post.length : "0"} posts
                </p>
                <p className="px-2 font-medium">
                  {user.followers ? user.followers.length : "0"} followers
                </p>
                <p className="px-2 font-medium">
                  {user.following ? user.following.length : "0"} following
                </p>
              </div>
            </div>
          </div>
          <hr className="w-[90%] m-[auto] opacity-[0.8]  my-[15px] mx-[auto]" />
          <div className="gallery grid grid-cols-3 items-center gap-x-4 px-5">
            {Array.isArray(post) &&
              post.map((e, index) => (
                <div
                  key={index}
                  onMouseEnter={() => {
                    e.isHovered = true;
                  }}
                  onMouseLeave={() => (e.isHovered = false)}
                  className="relative group h-[90%] w-full"
                >
                  <img
                    onClick={() => OpnePostDetails(e)}
                    className="object-cover bg-slate-200 h-full w-full transition-opacity duration-300 group-hover:opacity-50"
                    src={e.photo}
                    alt=""
                  />
                  <div
                    onClick={() => OpnePostDetails(e)}
                    className="absolute inset-0 flex items-center justify-center bg-[rgba(16,13,13,0.4)] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="flex space-x-4">
                      <div className="">
                        <button className="text-white text-2xl flex gap-2 items-center">
                          <FcLike
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                          <p className="text-xs">{e.likes.length}</p>
                        </button>
                      </div>
                      <div className="">
                        <button className="text-white text-2xl flex gap-2 items-center">
                          <FaComment className="text-[#fff] text-md" />
                          <p className="text-xs">{e.comments.length}</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {sow && (
          <PostDetail
            itemsData={post_one}
            userData={user}
            ClosetComment={ClosePostDetails}
            setsow={setsow}
          />
        )}
        {changePic && <ProfilePic close={ChnageProfileClose} />}
      </div>
    </div>
  );
};

export default Profie;
