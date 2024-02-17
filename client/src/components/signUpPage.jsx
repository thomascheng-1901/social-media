import {React, useRef, useState, useEffect} from 'react'
import {useNavigate, Navigate} from "react-router-dom"
import {duplicateUserOnSignUp} from "./constants.jsx"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setLogin} from "../state/index.jsx"

const SignUpPage = () => {

    const navigate = useNavigate();

    const form = useRef();

    const [errorMessage, setErrorMessage] = useState("");
 
    const SignUp = async (e) => {
        // firstName, lastName, email, password, picturePath, friends, location, occupation
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", e.target.firstName.value);
        formData.append("lastName", e.target.lastName.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("picturePath", "");
        formData.append("friends", []);
        formData.append("location", "");
        formData.append("occupation", "");
        try {
            const savedUserResponse = await fetch(
                "http://localhost:3001/auth/register",
                {
                method: "POST",
                body: formData,
                }
            );
            const savedUser = await savedUserResponse.json();
            if (!("error" in savedUser)){
                navigate("/");
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                )
            } else {
                if (savedUser["error"].includes(duplicateUserOnSignUp)){
                    setErrorMessage("Account already registered");
                }
            }
        } catch (e){
            console.log("Register error: " + e);
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form ref={form} onSubmit={SignUp} action="" className='w-[80%]  mt-[5%]'>
                <div className='space-y-5 text-center'>
                    <div className='space-y-2'>
                        <h1>Name</h1>
                        <div className='space-x-2 flex '>
                            <input className='w-full placeholder:text-center' placeholder='Enter your first name' name='firstName' type="text" />
                            <input className='w-full placeholder:text-center' placeholder='Enter your last name' name='lastName' type="text" />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h1>Email</h1>
                        <input placeholder='Enter your email' className="w-full placeholder:text-center" name='email' />
                    </div>
                    <div className='space-y-2'>
                        <h1>Password</h1>
                        <input placeholder="Enter your password" className="w-full placeholder:text-center" name='password' />
                    </div>
                    <button type='submit' className='bg-white px-4 py-1 rounded-2xl hover:bg-gray-300'>
                        SIGNUP
                    </button>
                    <div className='font-bold text-xl'>
                        {errorMessage}
                    </div>
                    <div>
                        Already have an account? Go to <Link to="/login" className='underline hover:text-gray-400'>LOGIN</Link> page
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage
