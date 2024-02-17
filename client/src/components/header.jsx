import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from '../state';

const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let user;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    function logOut(){
        dispatch(
            setLogOut()
        );
        navigate("/");
        console.log("After logout user = " + user);
    }

    return (
        <div className='min-h-[50px] bg-white flex items-center'>
            <Link to="/" className='text-[#67e8f9] ml-3'>PostPedia</Link>
            <div className='w-full'></div>
            <ul className='mr-3 hover:text-gray-400 hover:underline'>
                {user === null && 
                    <Link to="signup">
                        SIGNUP
                    </Link>
                }
                {user !== null && 
                    <button onClick={logOut}>
                        LOGOUT
                    </button>
                }
            </ul>
        </div>
        
    )
}

export default Header
