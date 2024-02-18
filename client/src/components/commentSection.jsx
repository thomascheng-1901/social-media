import {React, useState} from 'react'

const commentSection = (props) => {

    const [showComments, setShowComments] = useState(false);

    function toggle(){
        setShowComments(!showComments);
    }

    return (
        <div>
            {!showComments && <button onClick={toggle}>Comments: ({props.comments.length})</button>}
            {showComments && <button onClick={toggle}><div className='text-left'>{props.comments.map((c) => <p>{c}</p>)}</div></button>}
        </div>
    )
}

export default commentSection
