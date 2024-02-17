import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <div className='min-h-[50px] bg-white flex items-center'>
            <Link to="/" className='text-[#67e8f9] ml-3'>PostPedia</Link>
            <div className='w-full'></div>
            <ul className='mr-3 hover:text-gray-400 hover:underline'>
                <Link to="signup">
                    SIGNUP
                </Link>
            </ul>
        </div>
        
    )
}

export default Header
