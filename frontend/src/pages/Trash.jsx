import React from 'react'
import Navbar from "../components/Navbar"
import { Toaster } from 'react-hot-toast';
import TrashComp from '../components/TrashComp';
import SidebarComp from "../components/SidebarComp"
const Trash = () => {
  return (
    <div className="w-screen h-screen  bg-baby_gray ">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <SidebarComp />
      <TrashComp />
    </div>
  )
}

export default Trash