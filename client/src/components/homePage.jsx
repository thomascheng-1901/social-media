import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

const HomePage = () => {

    const [posts, setPosts] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    let user = null;
    try {

    user = useSelector((state) => state.user);
        console.log("id from redux:");
        console.log(user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    useLayoutEffect(() => {
        getFeedPosts();
    }, []);

  const getFeedPosts = async () => {
    try {
      const postsResponse = await fetch('http://localhost:3001/posts', {
        method: 'GET',
      });
      const posts = await postsResponse.json();
      const result = posts.map((post) => ({
        id: post._id,
        userId: post.userId,
        firstName: post.firstName,
        lastName: post.lastName,
        location: post.location,
        picturePath: post.picturePath,
        userPicturePath: post.userPicturePath,
        likes: post.likes,
        comments: post.comments,
        __v: post.__v,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }));
      console.log(result);
      setPosts(result);
    } catch (e) {
      console.log('Fetch posts error: ' + e);
    }
  };

  return (
    <div className='flex justify-evenly h-screen'>
      {user !== null && <div className='w-[30%] h-[50%] bg-white sticky top-[60px] text-black text-center space-y-5 px-2'>
        <Link>{user.firstName} {user.lastName}</Link>
        <div><FaLocationDot/>{user.location}</div>
        <div><MdWork />{user.occupation}</div>
        <textarea className='bg-gray-400/50 w-full h-[50%] resize-none px-1 py-1' name="" id="" placeholder='Create a post'></textarea>
      </div>}
      <div className='w-[60%] bg-red-500'>yo</div>
    </div>
  );
};

export default HomePage;