import React, { useEffect, useState } from "react";
import { FollowUser, ProfileData, UnFollowUser } from "../server/Api/api";
import { useParams } from "react-router-dom";

const UserProfile = () => {

  const userimg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  
  const { _id } = useParams();
  const [isFollow, setisFollow] = useState(false)
  useEffect(() => {
    GetProfieData();
  }, [isFollow]);

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
console.log(user);

  const OpnePostDetails = (e) => {
    setsow(true);
  };

  const ClosePostDetails = () => {
    setsow(false);
  };

  const GetProfieData = () => {
    ProfileData(_id, setUser, setPosts,setisFollow);
  };

  // Follow user

  const FollowUsers = (_id) => {
    FollowUser(_id,setisFollow);
  };

  // unFollow user

  const UnFollowUsers = (_id) => {
    UnFollowUser(_id,setisFollow);
  };

  return (
    <div className="pt-16 flex justify-center ">
      <div className="max-w-[600px] h-max border rounded-lg">
        <div className="flex justify-evenly">
          <div className="h-fit">
            <img
              className="w-[160px] h-[160px] object-contain rounded-full"
              src={user.Photo ? user.Photo : userimg}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-around">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-semibold text-center">
                {user.name}
              </h2>
              <button 
              onClick={()=> {if(isFollow){UnFollowUsers(user._id)}else{FollowUsers(user._id)}}}
              className="bg-[#0115ed] text-white px-4 py-1 rounded-lg ease-in duration-200 hover:scale-[1.2] hover:shadow-xl active:scale-[1]">
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="flex">
              <p className="px-2 font-medium">{posts.length} posts</p>
              <p className="px-2 font-medium">{user.followers ? user.followers.length:"0"} followers</p>
              <p className="px-2 font-medium">{user.followimg ? user.followimg.length:"0"} following</p>
            </div>
          </div>
        </div>
        <hr className="w-[90%] m-[auto] opacity-[0.8]  my-[25px] mx-[auto]" />
        <div className="gallery flex flex-wrap">
          {posts.map((e, index) => {
            return (
              <img
                onClick={() => OpnePostDetails(e)}
                key={index}
                className="w-[30%] p-[10px]"
                src={e.photo}
                alt=""
              />
            );
          })}
        </div>
      </div>
      {/* {sow && <PostDetail itemsData={post} ClosetComment={ClosePostDetails}/>} */}
    </div>
  );
};

export default UserProfile;
