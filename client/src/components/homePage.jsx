import React, { useLayoutEffect, useState, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import Avatar from "../assets/images/avatar1.jpg"
import PostImage from "../assets/images/blog1.jpg"
import CommentSection from "./commentSection.jsx"
import {setProfileToFind} from "../state/index.jsx"

const HomePage = () => {

    const stop = useRef(true);

    const dispatch = useDispatch();

    const [posts, setPosts] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    let user = null;
    try {
        user = useSelector((state) => state.user);
        console.log("redux result");
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
      setPosts(result);
    } catch (e) {
      console.log('Fetch posts error: ' + e);
    }
  };

  const navigate = useNavigate();

  const searchProfile = (id) => {
    console.log("Search profile: " + id);
    if (stop.current) return console.log("stop navigate");
    dispatch(
        setProfileToFind({
            id: id
        })
    )
    navigate(`profile/${id}`)
  }

  return (
    <div className=' flex justify-evenly h-screen'>
          {
            user !== null && 
            <div className='w-[30%] h-[60%] bg-white text-black text-center space-y-4 px-2 mt-10'>
                <button onClick={()=>{stop.current = false; searchProfile(user._id)}}>{user.firstName} {user.lastName}</button>
                <div className='flex items-center space-x-5'><FaLocationDot/><h1>{user.location}</h1></div>
                <div className='flex items-center space-x-5'><MdWork /><h1>{user.occupation}</h1></div>
                <textarea className='bg-gray-400/50 w-full h-[40%] resize-none px-1 py-1' name="" id="" placeholder='Create a post'></textarea>
                <button className='rounded-2xl bg-gray-400/50 px-4 py-1'>POST</button>
            </div>
          }
      <div className='w-[60%] space-y-5 mt-10 '>
        {
            posts.map((post) => 
                <div key={post.id} className='bg-white p-2 space-y-3'>
                    <div className='flex space-x-2'>
                        <img className='max-w-[2.5rem] rounded-lg' src={Avatar} alt="profileImage" />
                        <div className=''>
                            <button onClick={()=>{stop.current = false; searchProfile(post.userId)}}>
                              <div className='flex space-x-2'>
                                <h1 className=''>{post.firstName}</h1>
                                <h1 className=''>{post.lastName}</h1>
                              </div>
                            </button>
                            <h2 className='text-gray-400/50 text-sm'>{post.createdAt.split("T")[0]}</h2>
                        </div>
                    </div>
                    <p className=''>{post.description}</p>
                    <img className='rounded-lg' src={PostImage} alt="postImage" />
                    <CommentSection comments ={post.comments}></CommentSection>
                </div>
            )
        }
              <div className='h-[10px]'></div>
      </div>
    </div>
  );
};

export default HomePage;