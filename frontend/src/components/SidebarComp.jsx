import React, { useState, useEffect, useContext } from 'react'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { useNavigate } from 'react-router-dom';
const SidebarComp = () => {
    const navigate = useNavigate()
    const [clickednotes, setclickednotes] = useState(false);
    const [clickedtags, setclickedtags] = useState(false);
    const [clickedtrash, setclickedtrash] = useState(false);
    useEffect(() => {
        let path_name = window.location.pathname.substring(1)
        if (path_name === "trash") {
            setclickedtrash(true)
        } else if (path_name === "tags") {
            setclickedtags(true)
        } else {
            setclickednotes(true)
        }
    }, [])
    return (
        <div className="h-[150px]  w-[61px]  absolute flex flex-col space-y-1  mt-7 ml-7 shadow-2xl  hover:w-[260px] duration-200 bg-white group z-50 justify-center border-2 border-purple-400 px-2">
            {
                clickednotes ?
                    <div className="flex space-x-6 items-center bg-purple-400  rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/home")} >
                        <div className="bg-purple-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <LightbulbOutlinedIcon className=" text-gray-200" fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-200 font-semibold px-4 py-1 rounded-lg">Notes</span>
                        </div>
                    </div>
                    :
                    <div className="flex space-x-6 items-center hover:bg-purple-200 rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/home")} >
                        <div className="hover:text-yellow-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <LightbulbOutlinedIcon className=" text-gray-700 " fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-700 font-semibold px-4 py-1 rounded-lg">Notes</span>
                        </div>
                    </div>
            }
            {
                clickedtags ?


                    <div className="flex space-x-6 items-center bg-purple-400  rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/tags")}>
                        <div className="bg-purple-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <SellOutlinedIcon className=" text-gray-200 " fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-200 font-semibold px-4 py-1 rounded-lg">Notes</span>
                        </div>
                    </div>


                    :
                    <div className="flex space-x-6 items-center hover:bg-purple-200 rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/tags")}>
                        <div className="hover:text-yellow-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <SellOutlinedIcon className=" text-gray-700 " fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-700 font-semibold px-4 py-1 rounded-lg">Notes</span>
                        </div>
                    </div>
            }
            {
                clickedtrash ?
                    <div className="flex space-x-6 items-center bg-purple-400  rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/trash")}>
                        <div className="bg-purple-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <DeleteOutlineOutlinedIcon className=" text-gray-200 " fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-200 font-semibold px-4 py-1 rounded-lg">Tags</span>
                        </div>
                    </div>
                    :
                    <div className="flex space-x-6 items-center hover:bg-purple-200 rounded-3xl duration-300 cursor-pointer" onClick={() => navigate("/trash")}>
                        <div className="hover:text-yellow-400 p-2 rounded-full w-[50px] cursor-pointer  relative">
                            <DeleteOutlineOutlinedIcon className=" text-gray-700 " fontSize="medium" />
                        </div>
                        <div className="w-0 group-hover:w-[200px] overflow-hidden  z-50 duration-200">
                            <span className=" text-xl  text-gray-700 font-semibold px-4 py-1 rounded-lg">Trash</span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SidebarComp