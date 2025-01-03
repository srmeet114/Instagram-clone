import axios from "axios";

const URL = "https://instagram-clone-saf1.onrender.com";

axios.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// post signup data
// const res = await axios({

export const postSignUpData = async (
  data,
  reset,
  notify,
  notifyerr,
  navigate
) => {
  try {
    const res = await axios.post(`${URL}/signup`, data);
    notify(res.data.message);
    reset();
    navigate("/signin");
    //     method: 'POST',
    //     url: `${URL}/signup`,
    //     data,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer YOUR_TOKEN',
    //     },
    //   });
  } catch (err) {
    notifyerr(err.response.data.error);
    console.error(err);
  }
};

// post signup data

export const postSignInData = async (
  data,
  reset,
  notify,
  notifyerr,
  navigate,
  setUserLogin
) => {
  try {
    const res = await axios.post(`${URL}/signin`, data);
    notify(res.data.message);
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    reset();
    setUserLogin(true);
    navigate("/");
  } catch (err) {
    notifyerr(err.response.data.error);
    console.error(err);
  }
};

// post post Share

export const postShareapi = async (
  body,
  url,
  setBody,
  setImage,
  setUrl,
  output,
  notify,
  notifyerr,
  navigate
) => {
  try {
    const res = await axios.post(`${URL}/createPost`, { body, pic: url });
    notify(res.data.message);
    setBody("");
    setImage(null);
    setUrl("");
    output.src =
      "https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg";
    navigate("/");
  } catch (err) {
    notifyerr(err.response.data.error);
  }
};

export const GoogleLogins = async (jwtDetail,setUserLogin,notify,notifyerr,navigate,credentialResponse) => {
  try {
    const res = await axios.post(`${URL}/googleLogin`, {
      name: jwtDetail.name,
      userName: jwtDetail.given_name + jwtDetail.family_name ,
      email: jwtDetail.email,
      email_verified: jwtDetail.email_verified,
      clientId: credentialResponse.clientId,
      Photo: jwtDetail.picture,
    });
    notify(res.data.message);
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUserLogin(true);
    navigate("/");
  } catch (err) {
    console.log(err);
    notifyerr(err);
  }
};

// GetPost Share

export const GetPosts = async (Gpostsdata,setGpostsdata,limit,skip) => {
  try {
    const res = await axios.get(`${URL}/allposts?limit=${limit}&skip=${skip}`);
    // setGpostsdata(...Gpostsdata,...res.data.posts);
    setGpostsdata((Gpostsdata)=>[...Gpostsdata,...res.data.posts]);
  } catch (err) {
    console.error(err);
  }
};

// GetProfie Data

export const GetProfie = async (setpost, setuser) => {
  try {
    const res = await axios.get(
      `${URL}/user/${JSON.parse(localStorage.getItem("user"))._id}`
    );
    setpost(res.data.post);
    setuser(res.data.user);
  } catch (err) {
    console.log(err);
  }
};

// post like
export const likePost = (id, Gpostsdata, setGpostsdata) => {
  try {
    axios
      .put(`${URL}/like`, { postId: id })
      .then((res) => {
        const result = res.data;
        const newdata = Gpostsdata.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setGpostsdata(newdata);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  } catch (err) {
    console.log(err);
  }
};

// post unlike
export const unlikePost = (id, Gpostsdata, setGpostsdata) => {
  try {
    axios
      .put(`${URL}/unlike`, { postId: id })
      .then((res) => {
        const result = res.data;
        const newdata = Gpostsdata.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setGpostsdata(newdata);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  } catch (err) {
    console.log(err);
  }
};

// post comment
export const postComment = async (
  text,
  id,
  setcomment,
  Gpostsdata,
  setGpostsdata,
  notify,
  notifyerr
) => {
  try {
    await axios
      .put(`${URL}/comment`, { text: text, postId: id })
      .then((res) => {
        notify("Commented Send Successfully");
        setcomment("");
        const result = res.data;
        const newdata = Gpostsdata.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setGpostsdata(newdata);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        notifyerr(err.response?.data || err.message);
      });
  } catch (err) {
    console.log(err);
  }
};

// post delete
export const DeletePost = async (
  _id,
  notify,
  notifyerr,
  navigate,
  ClosetComment
) => {
  try {
    const res = await axios.delete(`${URL}/deletePost/${_id}`);
    notify(res.data.message);
    ClosetComment();
    navigate("/");
  } catch (err) {
    console.log(err);
    notifyerr(err.response.data.error);
    ClosetComment();
  }
};

// Get userProfile data
export const ProfileData = async (_id, setUser, setPosts, setisFollow) => {
  try {
    const res = await axios.get(`${URL}/user/${_id}`);
    setUser(res.data.user);
    setPosts(res.data.post);
    if (
      res.data.user.followers.includes(
        JSON.parse(localStorage.getItem("user"))._id
      )
    ) {
      setisFollow(true);
    }
  } catch (err) {
    console.log(err);
  }
};

// Follow user

export const FollowUser = async (_id, setisFollow,notify,notifyerr) => {
  try {
    const res = await axios.put(`${URL}/follow`, { followId: _id });
    notify(res.data.message);
    setisFollow(true);
  } catch (err) {
    console.log(err);
    notifyerr(err.response.data.error);
  }
};

// Follow user

export const UnFollowUser = async (_id, setisFollow,notify,notifyerr) => {
  try {
    const res = await axios.put(`${URL}/unfollow`, { followId: _id });
    notify(res.data.message);
    setisFollow(false);
  } catch (err) {
    console.log(err);
    notifyerr(err.response.data.error);
  }
};

// Get Following Post Data

export const GetFollowingPost = async (setGpostsdata) => {
  try {
    const res = await axios.get(`${URL}/myfollwingpost`);
    setGpostsdata(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const postPic = async (url, close) => {
  console.log(url);

  try {
    const res = await axios.put(`${URL}/uploadProfilePic`, { pic: url });
    console.log(res);
    close();
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
