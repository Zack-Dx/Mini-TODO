import React, { useState, Fragment, useEffect, useContext } from 'react'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import KeepContext from '../context/KeepContext';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Card from "./Card"
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useNavigate } from 'react-router-dom'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
const Notes = () => {
    const [user, setUser] = useState(
        {
            Email: "",
            Password: ""
        }
    )

    const { fetch_note, handleAddNote, allNotes, NotePin, get_all_pinned_notes, delete_note, handlePinned, handleComplete, update_note, isOpen, setIsOpen, note, setNote, handleModalClick, handleUpdate , handleClose , editModelData , seteditModelData} = useContext(KeepContext)
    useEffect(() => {
        get_all_pinned_notes()
        fetch_note(false)
    }, [])

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
        get_all_pinned_notes()
    }





    return (
        <div className="flex-grow w-full h-[91%]  flex flex-col space-y-2 relative ">
            <div className="w-full flex justify-center pt-3 bg-baby_gray  h-[11%]">
                <div className="w-1/3 shadow-md rounded-lg  h-14 hover:h-52 duration-100 group relative group-hover:flex group-hover:flex-col group-hover:items-center z-50  border-2 border-purple-400 hover:border-baby_gradient_purple_hv  p-1 bg-purple-200">
                    <div className="h-0 w-full group-hover:opacity-100 opacity-0 group-hover:h-1/5 duration-200 absolute group-hover:relative ml-10 group-hover:ml-0 rounded-2xl px-3  bg-purple-100 group-hover:border-b-2 group-hover:border-baby_purple text-baby_gradient_purple_hv">
                        <input type="text" placeholder='Title' className="bg-purple-100 w-full h-full outline-none tracking-wide font-semibold    text-center placeholder-baby_gradient_purple_hv"
                            name="title" value={note.title} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="w-full group-hover:h-1/5 flex justify-between group-hover:opacity-100 opacity-0  absolute group-hover:relative space-x-1  mt-2">
                        <div className="w-1/2 group-hover:h-full duration-200    justify-between rounded-2xl px-3  bg-purple-100 group-hover:border-b-2 group-hover:border-baby_purple text-baby_gradient_purple_hv">
                            <input type="text" placeholder='Tag' className="w-full h-full outline-none tracking-wide font-semibold     text-center bg-purple-100 placeholder-baby_gradient_purple_hv"
                                name="tag_line" value={note.tag_line} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="w-1/2 group-hover:h-full duration-200    justify-between rounded-2xl px-3  bg-purple-100 group-hover:border-b-2 group-hover:border-baby_purple text-baby_gradient_purple_hv">
                            <input type="text" placeholder='( HH : MM )' className="text-center w-full h-full outline-none tracking-wide font-semibold  bg-purple-100 placeholder-baby_gradient_purple_hv"
                                name="deadline" value={note.deadline} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full h-full  group-hover:h-1/5 flex items-center space-x-7  z-50 group-hover:mt-2 rounded-2xl px-3 bg-purple-100 group-hover:border-b-2 group-hover:border-baby_purple text-baby_gradient_purple_hv">
                        <input type="text" placeholder='Take a note' className="w-full h-full outline-none tracking-wide font-semibold text-center  bg-purple-100 placeholder-baby_gradient_purple_hv" name="body" value={note.body} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })} />
                        <StickyNote2OutlinedIcon className="text-purple-400  group-hover:opacity-0 opacity-100 " />
                    </div>
                    <div className="group-hover:opacity-100 opacity-0 w-full group-hover:h-1/6  absolute group-hover:relative cursor-pointer bg-purple-400 border-2 border-purple-300 hover:border-baby_purple  text-purple-600  rounded-full group-hover:my-2 flex justify-center active:scale-90 hover:bg-baby_purple hover:text-purple-200 group-hover:mt-4 items-center" onClick={handleAddNote}>
                        <CheckCircleOutlineOutlinedIcon />
                    </div>
                </div>
            </div>
            <div className="w-full flex h-[89%]   space-x-10 justify-center absolute bottom-0 pt-8">
                <div className="w-2/5 h-[95%]  rounded-3xl flex flex-col items-center shadow-2xl border-2 border-baby_dark_skyblue bg-white">
                    <h1 className="h-[10%]  text-3xl font-bold text-gray-800 py-2">Pinned</h1>
                    {
                        NotePin.length > 0 ? <div className="w-full  h-[90%]  grid grid-cols-2 py-5  px-5 gap-y-4 rounded-3xl overflow-y-scroll content-start scrollbar-hide">
                            {
                                NotePin.map((ele) => (
                                    <div key={ele.title} className="w-[260px] h-[140px] rounded-xl shadow-sm  duration-200 cursor-pointer border-2 border-purple-700 group flex justify-between hover:scale-105 hover:bg-purple-100 group overflow-hidden bg-purple-50">
                                        <div className="h-full w-5/6 flex flex-col  relative  ">
                                            <span className="h-[40%]  text-2xl flex items-center font-semibold tracking-wide text-purple-700 group-hover:text-purple-900 overflow-hidden  break-all px-2 py-1">{ele.title}</span>
                                            <p className="h-[60%] text-sm tracking-wide font-light group-hover:text-purple-900 
                                        text-purple-700 p-2 break-all
                                        ">{ele.body}</p>
                                            <div className="absolute rounded-full group-hover:opacity-100 duration-500 opacity-0  bottom-1 right-0 m-1">
                                                <CheckCircleOutlineOutlinedIcon className="  hover:bg-purple-700 p-1 rounded-full 
                                            group-hover:hover:text-white
                                            text-purple-900" fontSize="large" onClick={() => handleComplete(ele, "")} />
                                            </div>
                                        </div>
                                        <div className="w-1/6 flex flex-col-reverse   opacity-0 group-hover:opacity-100 duration-500  pb-2">
                                            <DeleteOutlineOutlinedIcon className="
                                        group-hover:hover:text-white
                                         hover:bg-purple-700 p-1 rounded-full duration-300 text-purple-900" fontSize="large" onClick={() => handleDelete(ele)} />
                                            <EditOutlinedIcon className="
                                        group-hover:hover:text-white  hover:bg-purple-700 p-1 rounded-full duration-300 text-purple-900" fontSize="large" onClick={() => handleModalClick(ele)} />
                                            <PushPinOutlinedIcon className="
                                        group-hover:hover:text-white hover:bg-purple-700 p-1 rounded-full duration-300 z-50 text-purple-900" fontSize="large" onClick={() => handlePinned(ele, false)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                            :
                            <div className="w-full  h-[90%] flex justify-center ">
                                <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_yuisinzc.json" background="transparent" speed="1" style={{ width: "400px", height: "400px" }} loop autoplay></lottie-player>
                            </div>
                    }
                </div>
                <Card data={allNotes} />
                <Transition show={isOpen} enter="transition  ease-in" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-200 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0" as={Fragment}>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="w-full h-full  absolute backdrop-blur-md bg-white/30 top-0 flex items-center justify-center z-50 ">
                        <div className="w-1/4 h-[69%]  rounded-2xl bg-baby_skyblue flex flex-col  items-center p-4 py-6 relative border-2 border-baby_dark_skyblue">
                            <CloseOutlinedIcon className="absolute right-5 top-10  cursor-pointer z-10" onClick={() => handleClose()} />
                            <div className="mt-10 h-1/5 w-4/5 flex flex-col space-y-3">
                                <label className="text-xs font-">Title</label>
                                <div className='flex border-2 border-baby_dark_skyblue rounded-xl px-3 py-2'>
                                    <SubtitlesOutlinedIcon className=" text-gray-700" />
                                    <input type="text" className="bg-baby_skyblue w-full outline-none pl-4 h-full text-baby_dark_skyblue" id="title" placeholder="Title" name="title" value={note.title} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })} />
                                </div>
                            </div>
                            <div className="h-1/5 w-4/5 flex flex-col space-y-3 mt-2">
                                <label className="text-xs font-">Label</label>
                                <div className='flex border-2 border-baby_dark_skyblue rounded-xl px-3 py-2'>
                                    <LabelOutlinedIcon className="  text-gray-700" />
                                    <input type="text" className="bg-baby_skyblue w-full outline-none pl-4 text-baby_dark_skyblue"
                                        id="tag_line" placeholder="Tagline"
                                        name="tag_line" value={note.tag_line} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="h-1/5 w-4/5 flex flex-col space-y-3 mt-2">
                                <label className="text-xs font-">Deadline</label>
                                <div className='flex border-2 border-baby_dark_skyblue rounded-xl px-3 py-2'>
                                    <AccessTimeOutlinedIcon className=" text-gray-700" />
                                    <input type="text" className="bg-baby_skyblue w-full outline-none pl-4 text-baby_dark_skyblue"
                                        id="Deadline" placeholder="Deadline" name="deadline" value={note.deadline} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="h-1/5 w-4/5 flex flex-col space-y-3 mt-2">
                                <label className="text-xs font-">Body</label>
                                <div className='flex border-2 border-baby_dark_skyblue rounded-xl px-3 py-2'>
                                    <DescriptionOutlinedIcon className=" text-gray-700" />
                                    <input type="text" className="bg-baby_skyblue w-full outline-none pl-4 text-baby_dark_skyblue"
                                        id="body" placeholder="Type your password"
                                        name="body" value={note.body} onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button className=" bg-baby_gradient_purple rounded-2xl text-white font-bold text-xl font-Baby_Roboto px-10 py-2 hover:scale-110  duration-300 hover:bg-baby_gradient_purple_hv shadow-md shadow-baby_gradient_purple active:scale-95 mt-4" onClick={() => handleUpdate()}>Save</button>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    )
}
export default Notes