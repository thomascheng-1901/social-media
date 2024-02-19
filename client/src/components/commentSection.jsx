import {React, useRef, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

const commentSection = (props) => {

    let user = null;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    const [showComments, setShowComments] = useState(false);

    function toggle(){
        if (props.comments.length > 0)
        setShowComments(!showComments);
    }

    const [comment, setComments] = useState("");

    const handleTextArea = (e) => {
        const commentTextAreaValue = e.target.value;
        console.log("handling: " + commentTextAreaValue);
        setComments(commentTextAreaValue);
      };

    let position = 0;

    const form = useRef();

    const leaveComment = async (e) => {
        e.preventDefault();
        console.log("leave comment");
        const response = await fetch(`http://localhost:3001/posts/${props.id}/comment`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id, comment: e.target.commentTextArea.value}),
        });
        e.target.commentTextArea.value = "";
        window.location.reload();
    }

    return (
        <div>
            {!showComments && <button onClick={toggle}>Comments: ({props.comments.length})</button>}
            {showComments && <button onClick={toggle}><div className='text-left'><p>Comments: ({props.comments.length})</p>{props.comments.length > 0 && props.comments.map((c) => {position += 1; return <p className={position % 2 === 0?'text-black':'text-gray-400'}>{c}</p>})}</div></button>}
            {user !== null && <form ref={form} onSubmit={leaveComment}><textarea className='bg-gray-400/50 resize-none w-full mt-3' onChange={handleTextArea} name='commentTextArea' placeholder='Leave a comment'></textarea>{comment !== "" && <div className='text-center'><button type='submit' className='bg-gray-400/50 rounded-2xl px-3 py-1'>COMMENT</button></div> }</form>}
        </div>
    )
}

export default commentSection
