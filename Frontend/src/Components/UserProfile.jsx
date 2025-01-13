import React, { useEffect, useState } from "react";
import { FollowUser, ProfileData, UnFollowUser } from "../server/Api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import PostDetail from "./PostDetail";

const UserProfile = () => {
  const userimg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);

  const { _id } = useParams();
  const [isFollow, setisFollow] = useState(false);
  useEffect(() => {
    GetProfieData();
  }, [isFollow]);

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const GetProfieData = () => {
    ProfileData(_id, setUser, setPosts, setisFollow);
  };

  // Follow user

  const FollowUsers = (_id) => {
    FollowUser(_id, setisFollow,notify,notifyerr);
  };

  // unFollow user

  const UnFollowUsers = (_id) => {
    UnFollowUser(_id, setisFollow,notify,notifyerr);
  };

    const [sow, setsow] = useState(false);
  

  return (
    <div className="pt-16 max-[800px]:pt-0 flex justify-center mb-5">
      <div className="max-w-[600px] h-max border rounded-lg my-5">
        <div className="flex justify-around p-5">
          <div className="h-fit cursor-pointer">
            <img
              className="w-[160px] h-[160px] object-contain rounded-full "
              src={user.Photo ? user.Photo : userimg}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-around">
            <h2 className="text-3xl font-semibold text-center">
            {user.name}
            </h2>
            <button
                onClick={() => {
                  if (isFollow) {
                    UnFollowUsers(user._id);
                  } else {
                    FollowUsers(user._id);
                  }
                }}
                className="bg-[#0097fe] text-white px-4 py-1 rounded-lg ease-in duration-200 active:scale-[1.1] hover:shadow-xl"
              >
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            <div className="flex">
              <p className="px-2 font-medium">
                {posts ? posts.length : "0"} posts
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
          {Array.isArray(posts) &&
            posts.map((e, index) => (
              <div
                key={index}
                onMouseEnter={() => {(e.isHovered = true)}}
                onMouseLeave={() => (e.isHovered = false)}
                className="relative group h-[90%] w-full"
              >
                <img
                  onClick={() => OpnePostDetails(e)}
                  className="object-cover bg-slate-200 h-full w-full transition-opacity duration-300 group-hover:opacity-50"
                  src={e.photo}
                  alt=""
                />
                <div onClick={()=>OpnePostDetails(e)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <div className="">
                      <button className="text-white text-2xl flex gap-2 items-center">
                        <FcLike  style={{ filter: "brightness(0) invert(1)" }} />
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
      {/* {changePic && <ProfilePic close={ChnageProfileClose} />} */}
    </div>
  );
};

export default UserProfile;
