
// const Navbar = () => {
//   
//   return (
//     <div className="w-full h-16 flex justify-between p-2 pl-7 border-b-2 border-gray-200 bg-white">
//       <div className="flex space-x-2 items-center cursor-pointer">
//         <img src="https://app-cdn.clickup.com/assets/images/brand/clickup_color-new.svg" alt="" className=""/>
//       </div>
//       <div className="flex space-x-2 bg-gray-100 rounded-lg w-1/2 items-center px-4 border-2 border-gray-200">
//         <SearchIcon className="text-gray-600" />
//         <input type="text" className="w-full h-full  text-md p-2 bg-gray-100 outline-none " />
//       </div>
//         <div className="relative group">
//           <div className="w-[50px] h-[50px] rounded-full shadow-2xl cursor-pointer bg-yellow-100 border-2 border-yellow-200 p-1 mr-5">
//             <img
//               src={localStorage.getItem("user_image")}
//               alt="user_avatar"
//               className="object-cover"/>
//           </div>
//           <div className="group-hover:opacity-100 opacity-0 rounded-2xl cursor-pointer absolute top-14 right-5 bg-yellow-100 text-yellow-400 px-10 py-2 border-2 border-yellow-200 hover:bg-orange-100 hover:scale-110 duration-200 active:scale-95 hover:text-orange-400 outline-none hover:border-orange-200 font-semibold tracking-wide z-50" >
//             <h1 className="text-center">Logout</h1>
//           </div>
//         </div>

//     </div>
//   )
// }
// export default Navbar

import React, { useEffect, useContext, useState } from 'react'
import KeepContext from "../context/KeepContext"
import { useNavigate } from "react-router-dom"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const Navbar = () => {
  const { setCond } = useContext(KeepContext)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("deletedTasks");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user_image");
    setCond(false)
  }
  return (
    <div className="h-[9%]  w-full overflow-hidden border-b-2 border-gray-200 z-50" onMouseLeave={() => setShow(false)}>
      <span className="w-full h-1/6 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 block"></span>
      <div className="w-full h-5/6 flex justify-between pl-10 pr-16 overflow-hidden py-2 relative items-center z-50">
        <img src="https://app-cdn.clickup.com/assets/images/brand/clickup_color-new.svg" alt="" className="w-32 hover:scale-105 cursor-pointer  duration-300 "
          onClick={() => navigate("/landing")} />
        {
          show && <div onMouseLeave={() => setShow(false)} className="absolute right-32 flex space-x-2 bg-gradient-to-l from-purple-200 via-purple-400 to-purple-800 border-purple-100 justify-center items-center text-white rounded-md hover:scale-110 duration-200 cursor-pointer px-3 py-1" onClick={() => handleLogout()}>
            <span className="text-semibold">Log Out</span>
            <LogoutOutlinedIcon />
          </div>
        }
        <img src={localStorage.getItem("user_image")} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 bg-baby_light_green cursor-pointer hover:scale-110 duration-300 hover:bg-baby_gradient_purple"  onMouseEnter={() => setShow(true)} />
      </div>
    </div>
  )
}

export default Navbar