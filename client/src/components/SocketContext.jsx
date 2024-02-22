import { createContext, useContext, useEffect, useState } from "react";
import {useSelector} from "react-redux"
import io from "socket.io-client"

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers]  = useState([]);
    const [comments, setComments] = useState(null);
    const [postIdWithComment, setPostIdWithComment] = useState(null);

    let currentUser = null;
    try {
        currentUser = useSelector((state) => state.user);
    } catch (e) {
        console.log("get current user error: " + e);
    }

    useEffect(() => {
        let socket;
        try {
            socket = io("http://localhost:3001",
            { transports : ['websocket'] },{
                query: {userId: currentUser._id}
            })
        } catch (e){
            socket = io("http://localhost:3001",
            { transports : ['websocket'] }
            // ,{query: {userId: currentUser._id}
            // }
            )
        }

        setSocket(socket);

        socket.on("leaveComment", (currentComments) => {
            console.log(currentComments);
            console.log("someone left a comment: " + currentComments[0] + " which is " + currentComments[1]);
            setPostIdWithComment(currentComments[0]);
            setComments(currentComments[1]);
        })

        // return () => socket.close();
    },[])

    return (<SocketContext.Provider value={{socket, onlineUsers, comments, postIdWithComment}}>
        {children}
        </SocketContext.Provider>)
}