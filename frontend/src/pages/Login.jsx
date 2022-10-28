import React, { useState, useEffect, useContext } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useNavigate } from 'react-router-dom'
import KeepContext from "../context/KeepContext";
import toast from 'react-hot-toast';

const Login = () => {
    const { login_user } = useContext(KeepContext);
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            Email: "",
            Password: ""
        }
    )
    const handleSubmit = async () => {
        const response_user = await login_user(user)
        console.log(response_user)
        if (response_user.success === true) {
            toast.success('Successfully Logged in!')
            navigate("/home")
        }
        else if (response_user.success === false && response_user.validationError === true) {
            response_user.error.map((ele) => (
                toast.error(ele.msg)
            ))
        } else if (response_user.success === false && response_user.type === 2) {
            toast.error(response_user.error)
        } else if (response_user.success === false && response_user.type === 3) {
            toast.error(response_user.error)
        } else {
            toast.error("Please Login Again!")
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col  bg-gray-100 overflow-hidden ">
            <div className="h-14  w-full flex justify-between px-10 z-50 bg-baby_gray items-center overflow-hidden ">
                <img src="https://app-cdn.clickup.com/assets/images/brand/clickup_color-new.svg" alt="" className="w-32 cursor-pointer z-50" onClick={()=>navigate("/")} />
                <div className="flex space-x-3 items-center justify-center  p-2">
                    <span className="text-gray-700 text-sm">Create a  account ?</span>
                    <button className="bg-baby_gradient_purple rounded-2xl text-white font-bold text-md font-Baby_Roboto px-7 py-1 hover:scale-110  duration-300 hover:bg-baby_gradient_purple_hv shadow-md shadow-baby_gradient_purple active:scale-95" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
            <div className=" flex items-center justify-center flex-grow z-50   relative overflow-hidden">
                <div className="z-50 w-1/3 h-3/5 rounded-xl shadow-2xl flex flex-col bg-baby_gray border-2 border-gray-200">
                    <h1 className="h-16 text-3xl font-bold font-Baby_Barlow flex items-center justify-center text-gray-800">Let's go!</h1>
                    <div className="flex-grow  flex flex-col  items-center p-4 ">
                        <div className="h-1/5 w-4/5 flex flex-col space-y-3">
                            <label className="text-xs font-">Email</label>
                            <div className='flex border-2 border-gray-200 rounded-xl px-3 py-2'>
                                <PersonOutlinedIcon className=" text-gray-700" />
                                <input type="email" className="w-full outline-none pl-4" value={user.Email} id="Email" name="Email" placeholder="Type your email" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                        <div className="h-1/5 w-4/5 flex flex-col space-y-3 mt-8">
                            <label className="text-xs font-">Password</label>
                            <div className='flex border-2 border-gray-200 rounded-xl px-3 py-2'>
                                <HttpsOutlinedIcon className=" text-gray-700" />
                                <input type="password" className="w-full outline-none pl-4" value={user.Password}
                                    id="Password" name="Password" placeholder="Type your password" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                />
                            </div>
                        </div>
                        <button className="mt-10 bg-baby_gradient_purple rounded-2xl text-white font-bold text-xl font-Baby_Roboto px-10 py-2 hover:scale-110  duration-300 hover:bg-baby_gradient_purple_hv shadow-md shadow-baby_gradient_purple active:scale-95" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="w-full h-7 border-t-2 border-gray-200  flex justify-center items-center p-2">
                        <span className=" text-center text-xs text-gray-500">By clicking the button above, you agree to our <span className="mx-1 underline text-gray-800">Terms of Service</span> and <span className="underline text-gray-800 mx-1">Privacy Policy</span> .</span>
                    </div>
                </div>
                <div className="-z-10 absolute top-[300px] w-[1900px] h-full bg-babyBackground  -rotate-[20deg] ">
                </div>
            </div>
        </div>
    )
}
export default Login