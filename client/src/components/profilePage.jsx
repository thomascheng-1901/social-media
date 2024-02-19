import React, { useLayoutEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import Avatar from "../assets/images/avatar1.jpg"
import PostImage from "../assets/images/blog1.jpg"
import CommentSection from "./commentSection.jsx"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const profileToFind = useSelector((state) => state.profileToFind);
  console.log("profileToFind = " + profileToFind);

  useLayoutEffect(() => {
    getUserProfile(profileToFind);
    getUserPosts(profileToFind);
  }, []);

  const getUserProfile = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'GET',
      });
      const userData = await response.json();
      setUser(userData);
      console.log("Fetch user profile: ");
      console.log(user);
    } catch (e) {
      console.log('Fetch profile error: ' + e);
    }
  };

  const getUserPosts = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}/posts`,{
      // const response = await fetch(`http://localhost:3001/posts/65c7b6e3d6c101ef2ca8e9f7/posts`,{
        method: 'GET',
      });
      const posts = await response.json();
      setPosts(posts);
      console.log("Fetch user posts: ");
      console.log(posts.length);
    } catch (e){
      console.log('Fetch posts error: ' + e);
    }
  }

  return (
    <div className='flex justify-evenly h-screen'>
      {
        user && 
        <div className='w-[30%] h-[20%] bg-white text-black text-center space-y-4 px-2 mt-10'>
            {/* <button onClick={()=>{stop.current = false; searchProfile(user._id)}}>{user.firstName} {user.lastName}</button> */}
            <h1>{user.firstName} {user.lastName}</h1>
            <div className='flex items-center space-x-5'><FaLocationDot/><h1>{user.location}</h1></div>
            <div className='flex items-center space-x-5'><MdWork className=''/><h1>{user.occupation}</h1></div>
        </div>
      }
      <div className='w-[60%] space-y-5 mt-10 '>
        { posts.length > 0 &&
            posts.map((post) => 
                <div key={post.id} className='bg-white p-2 space-y-3'>
                    <div className='flex space-x-2'>
                        <img className='max-w-[2.5rem] rounded-lg' src={Avatar} alt="profileImage" />
                        <div className=''>
                            <div className='flex space-x-2'>
                                <h1 className=''>{post.firstName}</h1>
                                <h1 className=''>{post.lastName}</h1>
                            </div>
                            <h2 className='text-gray-400/50 text-sm'>{post.createdAt.split("T")[0]}</h2>
                        </div>
                    </div>
                    <p className=''>{post.description}</p>
                    <img className='rounded-lg' src={PostImage} alt="postImage" />
                    <CommentSection comments ={post.comments}></CommentSection>
                </div>
            )
        }
        {
          posts.length == 0 &&
          <h1 className='text-center'>This person has not posted anything yet 🙂</h1>
        }
              <div className='h-[10px]'></div>
      </div>
    </div>
  );
};

export default ProfilePage;