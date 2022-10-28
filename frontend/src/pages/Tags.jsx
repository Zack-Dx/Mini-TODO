import React from 'react'
import Navbar from "../components/Navbar"
import { Toaster } from 'react-hot-toast';
import TagsComp from '../components/TagsComp';
import SidebarComp from "../components/SidebarComp"
const Tags = () => {
    return (
        <div className="w-screen h-screen  bg-baby_gray ">
            <Toaster position="top-right" reverseOrder={false} />
            <Navbar />
            <SidebarComp />
            <TagsComp />
        </div>
    )
}

export default Tags