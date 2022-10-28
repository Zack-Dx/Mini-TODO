import React, { useContext, useEffect, useRef, useState } from 'react'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeepContext from '../context/KeepContext';
import toast from "react-hot-toast"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';


const Card = ({ data }) => {
    const { delete_note, fetch_note, handlePinned, handleComplete , isOpen, setIsOpen , note, setNote , handleModalClick , handleUpdate } = useContext(KeepContext)
  

    const handleDelete = async (ele) => {
        const res_del = await delete_note(ele._id, "")
        fetch_note(false)
        if (localStorage.getItem("deletedTasks") === null) {
            localStorage.setItem("deletedTasks", JSON.stringify([ele]))
        } else {
            let trash_data = JSON.parse(localStorage.getItem("deletedTasks"))
            localStorage.setItem("deletedTasks", JSON.stringify([...trash_data, ele]))
        }
        if (res_del.success) {
            toast.success(res_del.message)
        } else {
            toast.error(res_del.message)
        }
    }
    return (
        <div className="w-2/5 h-[95%]  rounded-3xl flex flex-col items-center shadow-2xl  bg-white border-2 border-baby_dark_skyblue">
            <h1 className="text-3xl font-bold text-gray-800 py-2">OTHERS</h1>

            {

                data.length>0 ? <div className="w-full  h-[90%]  grid grid-cols-2 py-5  px-5 gap-y-4 rounded-3xl overflow-y-scroll content-start scrollbar-hide">
                    {
                        data.map((ele) => (
                            <div key={ele.title} className="w-[260px] h-[140px] rounded-xl shadow-sm  duration-200 cursor-pointer border-2 border-orange-500 group  flex justify-between hover:scale-105 hover:bg-orange-100 group overflow-hidden bg-orange-50" >
                                <div className="w-5/6 flex flex-col relative">
                                    <span className="h-[40%]  text-2xl flex items-center font-semibold tracking-wide text-orange-500 group-hover:text-orange-700 overflow-hidden  break-all px-2 py-1">{ele.title}</span>
                                    <p className="h-[60%] text-sm tracking-wide font-light group-hover:text-orange-700 
                                            text-orange-500 p-2 break-all">{ele.body}</p>
                                    <div className="absolute rounded-full group-hover:opacity-100 duration-500 opacity-0  bottom-1 right-0 m-1">
                                        <CheckCircleOutlineOutlinedIcon className="hover:bg-orange-500 p-1 rounded-full 
                                                group-hover:hover:text-white
                                                text-orange-700" fontSize="large" onClick={() => handleComplete(ele, "")} />
                                    </div>
                                </div>
                                <div className="w-1/6 flex flex-col-reverse   opacity-0 group-hover:opacity-100 duration-500  pb-2">
                                    <DeleteOutlineOutlinedIcon className="group-hover:hover:text-white
                                            hover:bg-orange-500 p-1 rounded-full duration-300 text-orange-700" fontSize="large" onClick={() => handleDelete(ele)} />
                                    <EditOutlinedIcon className="group-hover:hover:text-white
                                            hover:bg-orange-500 p-1 rounded-full duration-300 text-orange-700" fontSize="large" onClick={() =>handleModalClick(ele)} />
                                    <PushPinOutlinedIcon className="group-hover:hover:text-white
                                            hover:bg-orange-500 p-1 rounded-full duration-300 text-orange-700" fontSize="large" onClick={() => handlePinned(ele, false)} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <div className="w-full  h-[90%] flex justify-center ">
                    <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_yuisinzc.json"  background="transparent"  speed="1"  style={{width: "400px" ,  height: "400px"}}  loop  autoplay></lottie-player>
                </div>
            }
        </div>
    )
}
export default Card