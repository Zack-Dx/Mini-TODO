import React, { useContext, useState, useEffect } from 'react'
import KeepContext from '../context/KeepContext'
import toast from "react-hot-toast"
import SellIcon from '@mui/icons-material/Sell';
import LabelIcon from '@mui/icons-material/Label';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useNavigate } from "react-router-dom"
const TagsComp = () => {
    const { delete_note, setAllNotes, handleComplete, get_all_tags, allTags, get_tags_notes, allTagsnote, fetch_note, handlePinned } = useContext(KeepContext)
    const [tagname, settagname] = useState("All Notes")
    const navigate = useNavigate()


    useEffect(() => {
        get_all_tags(true)
    }, []);

    const [x, setx] = useState([])
    useEffect(() => {
        if (x.length > 0) {
            navigate("/trash")
        }
    }, [x])


    const handleDelete = async (ele) => {
        const res_del = await delete_note(ele._id, ele.tag_line)
        fetch_note()
        if (localStorage.getItem("deletedTasks") === null) {
            localStorage.setItem("deletedTasks", JSON.stringify([ele]))
            setx(JSON.parse(localStorage.getItem("deletedTasks")))
        } else {
            let trash_data = JSON.parse(localStorage.getItem("deletedTasks"))
            localStorage.setItem("deletedTasks", JSON.stringify([...trash_data, ele]))
            setx(JSON.parse(localStorage.getItem("deletedTasks")))
        }
        if (res_del.success) {
            toast.success(res_del.message)
        } else {
            toast.error(res_del.message)
        }
    }



    return (
        <div className="h-[91%] w-full bg-baby_gray flex justify-end   overflow-hidden ">
            <div className="w-[14%] h-full bg-purple-200 flex flex-col relative space-y-4 items-center overflow-y-scroll scrollbar-hide rounded-2xl border-2 ">
                {
                    <>
                        {
                            allTags.length !== 0 && <div className="w-4/5 flex space-x-4 items-center pl-4 cursor-pointer hover:scale-105 duration-200 active:scale-100 hover:bg-purple-300 px-2 hover:rounded-md hover:text-purple-700 mt-20 group" onClick={() => get_all_tags(true) && settagname(`All Notes`)}>
                                <SellIcon className="bg-purple-300 text-purple-600 p-1 rounded-md group-hover:bg-purple-300" fontSize="medium" />
                                <span className="text-md font-mono font-bold text-purple-600">All Notes</span>
                            </div>
                        }
                        {
                            allTags.length !== 0 && <h1 className="text-center text-xl text-gray-800 font-bold">Tags</h1>
                        }
                    </>
                }
                {
                    allTags.length !== 0 && allTags.map((ele) => (
                        <div key={ele} className="w-4/5 flex space-x-4 items-center pl-4 cursor-pointer hover:scale-105 duration-200 active:scale-100 hover:bg-purple-300 px-2 hover:rounded-md hover:text-purple-700 group" onClick={() => get_tags_notes(ele) && settagname(ele)}>
                            <LabelIcon className="bg-purple-300 text-purple-600 p-1 rounded-md group-hover:bg-purple-300
                            " fontSize="medium" />
                            <span className="text-md font-mono font-bold text-purple-600">{ele}</span>
                        </div>
                    ))
                }
                {
                    allTags.length === 0 &&
                    <div className="w-full h-full flex items-center justify-center bg-red-50 py-0">
                        <span className="bg-red-100 text-red-500 px-1 py-2 border-2 border-red-200 rounded-xl text-md">First Add Notes</span>
                    </div>
                }
            </div>
            <div className="w-[76%] h-full px-3 bg-purple-50 shadow-2xl rounded-tr-2xl rounded-br-2xl border-2  rounded-xl">
                <h1 className="text-3xl font-bold tracking-wide text-center mt-2 flex items-center justify-center">
                    {tagname !== "All Notes" && <LabelIcon className="mr-2 bg-purple-200 text-purple-600 p-1 rounded-md" fontSize="medium" />} {tagname}
                </h1>
                {
                    <>
                        {
                            allTags.length !== 0 ?
                                <div className="w-full  h-[90%]  grid grid-cols-3  py-5  px-20 gap-x-2 gap-y-6 rounded-3xl overflow-y-scroll content-start ">
                                    {
                                        allTagsnote.map((ele) => (
                                            <div key={ele.title} className="w-[260px] h-[140px] rounded-xl shadow-sm  duration-200 cursor-pointer border-2 border-green-500 group  flex justify-between hover:scale-105 hover:bg-green-200 group overflow-hidden bg-green-100">
                                                <div className="w-5/6 flex flex-col">
                                                    <span className="h-[40%]  text-2xl flex items-center  font-semibold tracking-wide text-green-500 group-hover:text-green-700 overflow-hidden  break-all px-2 py-1">{ele.title}</span>
                                                    <p className="h-[60%] text-sm tracking-wide font-light group-hover:text-green-800 
                                            text-green-600 px-2 break-all">{ele.body}</p>

                                                </div>
                                                <div className="w-1/6 flex flex-col-reverse   opacity-0 group-hover:opacity-100 duration-500  pb-2">
                                                    <DeleteOutlineOutlinedIcon className="group-hover:hover:text-white
                                             hover:bg-green-500 p-1 rounded-full duration-300 text-green-700" fontSize="large" onClick={() => handleDelete(ele)} />

                                                    <PushPinOutlinedIcon className="group-hover:hover:text-white
                                             hover:bg-green-500 p-1 rounded-full duration-300 text-green-700" fontSize="large" onClick={() => handlePinned(ele, true) && navigate("/home")} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className="  w-full h-full flex  justify-center pt-10">
                                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_g4wqji2g.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
                                </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default TagsComp