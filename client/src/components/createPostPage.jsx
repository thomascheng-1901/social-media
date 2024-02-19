import {React, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom"

const createPostPage = () => {

    const form = useRef();

    const navigate = useNavigate();

    let user = null;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    const createPost = async (e) => {
        if (e.target.postDescription.value !== "") {
          console.log(user.firstName);
          const content = e.target.postDescription.value;
          e.preventDefault();
          const data = {
            userId: user._id,
            description: content,
            picturePath: "",
            user: user,
          };
      
          const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          e.target.postDescription.value = "";
          navigate("/");
          // const posts = await response.json();
        } else {
          e.preventDefault();
          console.log("Empty text");
        }
      };

  return (
    <div className='flex justify-center items-center mt-[10%]'>
        <form ref={form} onSubmit={createPost} className='space-y-4 w-[50%] text-center'>
            <textarea name="postDescription" className='bg-gray-400/50 w-full h-[40%] resize-none px-1 py-1' id="" placeholder='Create a post'></textarea>
            <button type='submit' className='rounded-2xl bg-gray-400/50 px-4 py-1'>POST</button>
        </form>
    </div>
  )
}

export default createPostPage
