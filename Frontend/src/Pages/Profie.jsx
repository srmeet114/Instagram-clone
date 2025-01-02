import React, { useEffect, useState } from "react";
import { GetProfie } from "../server/Api/api";
import PostDetail from "../Components/PostDetail";
import ProfilePic from "../Modal/ProfilePic";

const Profie = () => {

  const userimg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  useEffect(() => {
    GetProfieData();
  }, []);

  const [sow, setsow] = useState(false);
  const [post, setpost] = useState([]);
  const [user, setuser] = useState("")
  const [changePic, setchangePic] = useState(false)

  const OpnePostDetails = (e) => {
    setsow(true);
    setpost(e);
  };

  const ClosePostDetails = () =>{
    setsow(false);
  }

  const ChnageProfileOpne = () =>{
    setchangePic(true)
  }
  
  const ChnageProfileClose = () =>{
    setchangePic(false)
  }

  const GetProfieData = () => {
    GetProfie(setpost,setuser,ChnageProfileClose);
  };

  return (
    <div className="pt-16 flex justify-center ">
      <div className="max-w-[600px] h-max border rounded-lg">
        <div className="flex justify-around p-5">
          <div className="h-fit">
            <img
              onClick={ChnageProfileOpne}
              className="w-[160px] h-[160px] object-contain rounded-full "
              src={user.Photo ? user.Photo : userimg}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-around">
            <h2 className="text-4xl font-semibold text-center">
              {JSON.parse(localStorage.getItem("user")).name}
            </h2>
            <div className="flex">
              <p className="px-2 font-medium">{post ? post.length:"0"} posts</p>
              <p className="px-2 font-medium">{user.followers? user.followers.length:"0"} followers</p>
              <p className="px-2 font-medium">{user.following? user.following.length:"0"} following</p>
            </div>
          </div>
        </div>
        <hr className="w-[90%] m-[auto] opacity-[0.8]  my-[15px] mx-[auto]" />
        <div className="gallery flex flex-wrap">
          {post.map((e, index) => {
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
      {sow && <PostDetail itemsData={post} ClosetComment={ClosePostDetails}/>}
      {changePic && <ProfilePic close={ChnageProfileClose}/>}
    </div>
  );
};

export default Profie;
