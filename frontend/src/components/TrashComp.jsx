import React, { useState, useEffect, useContext } from 'react'
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import KeepContext from '../context/KeepContext';
import RestorePageOutlinedIcon from '@mui/icons-material/RestorePageOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import toast from "react-hot-toast"
const TrashComp = () => {
    const { create_note } = useContext(KeepContext)
    const [trashData, setTrashData] = useState([])
    useEffect(() => {
        if (localStorage.getItem("deletedTasks") === null) {
            setTrashData([])
        } else {
            let trash_data = JSON.parse(localStorage.getItem("deletedTasks"))
            setTrashData([...trash_data])
        }
    }, []);



    const removeFromLStorage = (ele, cond_perm_del) => {
        let trash_local_data = localStorage.getItem("deletedTasks") ? JSON.parse(localStorage.getItem("deletedTasks")) : []

        let new_local_trash = []
        for (let i = 0; i < trash_local_data.length; i++) {
            if (trash_local_data[i]._id !== ele._id) {
                new_local_trash.push(trash_local_data[i])
            }
        }
        localStorage.setItem("deletedTasks", JSON.stringify(new_local_trash))
        setTrashData([...new_local_trash])
        if (cond_perm_del) {
            toast.success("Permanently Deleted!")
        }
    }

    const restoreAllTrashNotes = () => {
        for (let i = 0; i < trashData.length; i++) {
            create_note(
                {
                    title: trashData[i].title, tag_line: trashData[i].tag_line, body: trashData[i].body, deadline: trashData[i].deadline
                }, true)
        }
        setTrashData([])
        localStorage.setItem("deletedTasks", JSON.stringify([]))
    }


    return (
        <div className="h-[91%] w-full bg-baby_gray flex justify-end   overflow-hidden scrollbar-hide ">
            <div className="absolute  w-[92%] h-[91%]  top-[9%] right-0 flex  overflow-hidden">
                <div className="w-full h-full ">
                    <div className="flex  w-full h-16 items-center justify-center relative ">
                        <h1 className="text-5xl font-bold tracking-wide text-center mt-2 ">Trash</h1>
                        <button className=" absolute right-10 top-14 rounded-md shadow-2xl w-[120px] h-[30px] flex space-x-3 text-xs  justify-center items-center bg-yellow-100 text-yellow-700 tracking-wide hover:scale-110 active:scale-95 duration-200 hover:bg-orange-100 hover:text-orange-700" onClick={restoreAllTrashNotes}><RestorePageOutlinedIcon fontSize="small" />Restore All</button>
                    </div>
                    {
                        trashData.length > 0 ?
                            <div className="w-full  h-[90%]  grid grid-cols-4  py-9  px-20 gap-x-2 gap-y-6 rounded-3xl overflow-y-scroll content-start scrollbar-hide ">
                                {
                                    trashData.map((ele) => (
                                        <div key={ele.title} className="w-[260px] h-[140px] rounded-xl shadow-sm  duration-200 cursor-pointer border-2 border-red-500 group  flex justify-between hover:scale-105 hover:bg-red-200 group overflow-hidden bg-red-100">
                                            <div className="w-5/6 flex flex-col">
                                                <span className="h-[40%]  text-2xl flex items-center  font-semibold tracking-wide text-red-500 group-hover:text-red-700 overflow-hidden  break-all px-2 py-1">{ele.title}</span>
                                                <p className="h-[60%] text-sm tracking-wide font-light group-hover:text-red-600 
                                        text-red-400 px-2 break-all">{ele.body}</p>
                                            </div>
                                            <div className="w-1/6 flex flex-col-reverse   opacity-0 group-hover:opacity-100 duration-500  pb-2">
                                                <DeleteForeverOutlinedIcon className="group-hover:hover:text-white
                                         hover:bg-red-500 p-1 rounded-full duration-300 text-red-700" fontSize="large" onClick={() => removeFromLStorage(ele, true)} />
                                                <RestoreFromTrashOutlinedIcon onClick={() => create_note(
                                                    {
                                                        title: ele.title, tag_line: ele.tag_line, body: ele.body, deadline: ele.deadline
                                                    }, true
                                                ) && removeFromLStorage(ele, false)}
                                                    className="group-hover:hover:text-white
                                            hover:bg-red-500 p-1 rounded-full duration-300 text-red-700" fontSize="large" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div className="w-full h-[92%] flex justify-center overflow-hidden">
                                <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_lSDLsB.json" background="transparent" speed="1" style={{ width: "600px", height: "600px" }} loop autoplay></lottie-player>
                            </div>
                    }
                </div>


            </div>
        </div>
    )
}

export default TrashComp


