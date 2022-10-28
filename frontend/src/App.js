import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import {useContext , useEffect } from "react" 
import KeepContext from "./context/KeepContext";
import Trash from "./pages/Trash"
import Tags from "./pages/Tags"
import Landing from "./pages/Landing"

function App() {
  const { cond , setCond} = useContext(KeepContext);
  useEffect(()=>{
    if(localStorage.getItem("auth-token") && localStorage.getItem("auth-token").length > 0){
      setCond(true)
    }else{
      setCond(false)
    }
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={cond?<Home/>:<Navigate to="/"/>}/> 
        <Route path="/login" element={cond ?<Navigate to="/home"/> : <Login/>}/>
        <Route path="/register" element={cond?<Navigate to="/home"/>:<Register/>}/>
        <Route path="/trash" element={cond? <Trash/> :<Navigate to="/login"/>}/>
        <Route path="/tags" element={cond? <Tags/>: <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
}
export default App;
