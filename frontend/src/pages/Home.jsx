import React from 'react'
import Navbar from "../components/Navbar"
import { Toaster } from 'react-hot-toast';
import Notes from "../components/Notes"
import SidebarComp from "../components/SidebarComp"
const Home = () => {
  return (
    <div className="w-screen h-screen  bg-baby_gray ">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <SidebarComp/>
      <Notes />
    </div>
  )
}
export default Home