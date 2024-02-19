import {React, useState} from 'react'

const commentSection = (props) => {

    const [showComments, setShowComments] = useState(false);

    function toggle(){
        if (props.comments.length > 0)
        setShowComments(!showComments);
    }

    let position = 0;

    return (
        <div>
            {!showComments && <button onClick={toggle}>Comments: ({props.comments.length})</button>}
            {showComments && <button onClick={toggle}><div className='text-left'>{props.comments.length > 0 && props.comments.map((c) => {position += 1; return <p className={position % 2 === 0?'text-black':'text-gray-400'}>{c}</p>})}</div></button>}
        </div>
    )
}

export default commentSection
