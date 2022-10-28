const mongoose = require("mongoose")
const {Schema} = mongoose

const NoteSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    },
    title :{
        type : String, 
        required : true,
        unique : true
    },
    tag_line :{
        type : String, 
        required : true
    },
    body :{
        type : String, 
        required : true
    },
    deadline : {
        type : String, 
        required : true
    },
    isPinned : {
        type : Boolean, 
        default: false 
    }
} , {timestamps : true})

const Note = mongoose.model("Note",NoteSchema)
module.exports = Note