import React , {useEffect , useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Typed from "typed.js";

const Landing = () => {
    const el = useRef(null);
    const navigate = useNavigate()
    useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ["Set goals and crush them faster.", "All of your notes in one place"],
          typeSpeed: 50,
          backSpeed: 20,
          smartBackspace: true,
          loop: true,
          showCursor: true,
          cursorChar: "_"
        });
        return () => {
          typed.destroy();
        }
      }, []);
  return (
    <div className="w-screen h-screen overflow-hidden relative  bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <div className="h-[9%] w-full flex justify-between px-20 py-1 items-center z-50 ">
            <img src="https://app-cdn.clickup.com/assets/images/brand/clickup_color-new.svg" alt="" className="w-32 z-50"/>
            <div className="flex justify-between items-center space-x-7">
                <button className="bg-baby_purple rounded-md text-white font-bold text-md font-Baby_Roboto px-7 py-1 hover:scale-110  duration-300 hover:bg-rose-600 shadow-md shadow-baby_cyan active:scale-95 z-50" onClick={()=>navigate("/login")}>Login</button>
                <button className="bg-baby_purple rounded-md text-white font-bold text-md font-Baby_Roboto px-7 py-1 hover:scale-110  duration-300 hover:bg-rose-600 shadow-md shadow-baby_cyan active:scale-95 z-50" onClick={()=>navigate("/register")}>Register</button>
            </div>
        </div>
        <div className="flex w-full h-[91%] ">
            <div className="w-[55%] h-full flex flex-col   pl-20  pt-28">
                <h1 className="font-Baby_Inter font-black text-8xl gray-700 text-transparent bg-clip-text  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">One app to replace them all.</h1>
                <div className="w-full">
                    <span className="  text-4xl mt-10 font-black tracking-wide  
                    text-transparent bg-clip-text 
                    bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900" ref={el}></span>
                </div>
            </div>
            <div className="w-[55%] h-full z-30 flex pl-10">
                {/* <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png" alt="" /> */}
                <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_tFYxgv.json"  background="transparent"  speed="1"  style={{width: "700px" , height: "550px"}} className="relative -top-20"  loop  autoplay></lottie-player>
            </div>
        </div>
        {/* <div className="z-0 w-[1900px] h-[180%] rounded-full bg-gradient-to-r from-violet-900 via-rose-400 to-rose-900 absolute -top-[600px] -right-[1100px] -rotate-[60deg]">
        </div> */}
    </div>
  )
}

export default Landing