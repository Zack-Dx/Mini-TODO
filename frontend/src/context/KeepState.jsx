import KeepContext from "./KeepContext";
import { useState } from "react";
import {
  generateDiceBearAvataaars,
} from "../components/utils";
import toast from "react-hot-toast"

const KeepState = (props) => {
  const host = "http://localhost:5000"
  const [cond, setCond] = useState(false)
  const [userImage, setuserImage] = useState("")
  const [archived, setArchived] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [allTags, setAllTags] = useState([])
  const [allTagsnote, setallTagsnote] = useState([])
  const [NotePin, setNotePin] = useState([])
  const [eleEdit, seteleEdit] = useState({})
  let   [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState({
    title: "",
    tag_line: "",
    body: "",
    deadline: ""
  })
  const create_user = async (user) => {
    const response = await fetch(`${host}/api/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return (await response.json())
  }
  const login_user = async (user) => {
    const response = await fetch(`${host}/api/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const res_data = await response.json()
    if (res_data.success === true) {
      localStorage.setItem("auth-token", res_data.authToken)
      setCond(true)
      localStorage.setItem("user_image", generateDiceBearAvataaars(Math.random()))
    }
    return res_data
  }

  const fetch_note = async () => {
    const response = await fetch(`${host}/api/get-note`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    const res_data = await response.json()
    if(res_data.success){
      setAllNotes(res_data.data)
      return res_data.data
    }else{
      toast.error(res_data.error)
    }
  }

  
  const create_note = async (note, restored) => {
    const response = await fetch(`${host}/api/add-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify(note)
    })
    const res_data = await response.json()
    if (res_data.success) {
      if (restored) {
        toast.success("Restored The Note Successfully")
      }
      setAllNotes(await fetch_note())
    }
    return res_data
  }

  const get_all_tags = async (from_tags) => {
    const response = await fetch(`${host}/api/all-tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    const tag_data = await response.json()
    if (tag_data.success) {
      setAllTags(tag_data.tags)
      if(from_tags){
        setallTagsnote(await fetch_note())
      }
    }
    return tag_data.data
  }

  const get_tags_notes = async (find_this_tag) => {
    const response = await fetch(`${host}/api/all-tags-note/${find_this_tag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    const tags_notes_data = await response.json()
    if (tags_notes_data.success) {
      setallTagsnote(tags_notes_data.tags)
    }
    return tags_notes_data.data
  }



  const delete_note = async (note_id , tag_name) => {
    const response = await fetch(`${host}/api/delete-note/${note_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    const res_data = await response.json()
    if (res_data.success) {
      setAllNotes(await fetch_note())
      if(tag_name.length >0 ){
        if(tag_name !== "All Notes"){
          get_tags_notes(tag_name)
          get_all_tags()
        }else{
          get_all_tags()
        }
      }
    }
    return res_data
  }
  const handleAddNote = async () => {
    const note_data = await create_note(note, false)
    setNote({
      title: "",
      tag_line: "",
      body: "",
      deadline: ""
    })
    if (note_data.success) {
      toast.success("Note Created Successfully!")
      setAllNotes(await fetch_note())
    } else if (note_data.validationError) {
      note_data.error.map((ele) => (
        toast.error(ele.msg)
      ))
    } else {
      toast.error("Error During Creating Nore ! Please create again")
    }
  }
  
  


  const get_all_pinned_notes = async () => {
    const response = await fetch(`${host}/api/get-pinned-notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    const all_pinned_notes = await response.json()
    if (all_pinned_notes.success) {
      setNotePin(all_pinned_notes.data)
    }else{
      toast.error(all_pinned_notes.error)
    }
  }

  const handlePinned = async (ele , from_tags) => {
    const response = await fetch(`${host}/api/set-pinned/${ele._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
    })
    const res_data = await response.json()
    if (res_data.success) {
      get_all_pinned_notes()
      fetch_note()
      if(from_tags === true){
        get_all_tags(true)
      }
      toast.success(res_data.message)
    }else{
      toast.error(res_data.error)
    }
  }

  const handleComplete = (ele , tag_name) =>{
    delete_note(ele._id , tag_name)
    get_all_pinned_notes()
    if(tag_name !== "All Tags"){
      get_tags_notes(tag_name)
    }else{
      get_all_tags()
    }
    toast.success("Congratulations on completing your tasks!👌")
  }


  const update_note = async (id) =>{
    const response = await fetch(`${host}/api/update-note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify(note)
    })
    const update_data = await response.json()
    if(update_data.success){
      fetch_note()
      get_all_pinned_notes()
      toast.success(update_data.message)
    }else{
      toast.success(update_data.message)
    }
  }

  const handleModalClick = (ele) => {
    setIsOpen(!isOpen)
    seteleEdit(ele._id)
    setNote(ele)
}

const handleUpdate = () => {
  setIsOpen(false)
  update_note(eleEdit)
  setNote({
    title: "",
    tag_line: "",
    body: "",
    deadline: ""
  })
}

const handleClose = () =>{
  setNote({
    title: "",
    tag_line: "",
    body: "",
    deadline: ""
  })
  setIsOpen(false)
}
  
  

  return (
    <KeepContext.Provider value={{ create_user, login_user, cond, setCond, userImage, setuserImage, create_note, fetch_note, archived, setArchived, delete_note, allNotes, setAllNotes, handleAddNote, note, setNote, get_all_tags, allTags, get_tags_notes, allTagsnote, NotePin, setNotePin , handlePinned , get_all_pinned_notes , handleComplete  , update_note  , isOpen, setIsOpen , note, setNote , handleModalClick , handleUpdate , handleClose}}>
      {props.children}
    </KeepContext.Provider>
  )
}
export default KeepState;