const express = require("express")
const router = express.Router()
const Note = require("../models/Note")
const {body , validationResult} = require("express-validator")
const fetchUser = require("../middleware/fetchUser")

router.get("/get-note",fetchUser,async (req,res)=>{
    try{
        let all_notes = await Note.find({ user : req.user , isPinned : false}).sort( { "updatedAt": -1 } )
        res.status(200).json({success : true , data : all_notes})
    }catch(err){
        res.status(501).json({success : false , error : "Error while pinning the Note"})
    }
})

router.post("/set-pinned/:id",fetchUser,async (req,res)=>{
    try{
        let note = await Note.findById(req.params.id)
        if(note.isPinned === true){
            await Note.findByIdAndUpdate(req.params.id , {$set : {isPinned : false}})
            return res.status(200).json({success : true , message : "Note Unpinned!"})
        }
        await Note.findByIdAndUpdate(req.params.id , {$set : {isPinned : true}})
        return res.status(200).json({success : true , message : "Note Pinned!"})
    }catch(err){
        res.status(501).json({success : false , error : "Error while creating the Note"})
    }
})

router.get("/get-pinned-notes",fetchUser,async (req,res)=>{
    try{
        let pinned_notes = await Note.find({user : req.user , isPinned : true}).sort( { "updatedAt": -1 } )
        return res.status(200).json({success : true , data : pinned_notes})
    }catch(err){
        res.status(501).json({success : false , error : "Error while fetching pinned  notes"})
    }
})

router.delete("/delete-note/:id",fetchUser,async (req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id)
        return res.status(200).json({success : true , message : "Note deleted"})
    }catch(err){
        res.status(501).json({success : false , message : "Error while deleting the Note delete again!"})
    }
})

router.put("/update-note/:id",fetchUser,async (req,res)=>{
    try{
        const isPresent = await Note.findById(req.params.id)
        if(isPresent.title.length >0){
            const new_note = {}
            const {title ,tag_line ,body ,deadline} = req.body
            if(title){
                new_note["title"] = title
            }
            if(tag_line){
                new_note["tag_line"] = tag_line
            }
            if(body){
                new_note["body"] = body
            }
            if(deadline){
                new_note["deadline"] = deadline
            }
            await Note.findByIdAndUpdate(req.params.id , {$set : new_note})
            return res.status(200).json({success : true , message : "Note updated"})
        }
        return res.status(400).json({success : false , message : "Note not present"})
    }catch(err){
        res.status(501).json({success : false , message : "Error while updating the Note"})
    }
})

router.post("/add-note",[
    body("title","Enter a title of length more than 5").isLength({min:5}),
    body("tag_line","Enter a valid Tag Line").isLength({min : 3}),
    body("body" , "Enter a valid Description").isLength({min : 5}),
    body("deadline" , "Enter a valid Time").isLength({min : 3}),
],fetchUser,async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({success : false , error:error.errors  , validationError : true})
    }
    try{
        const {title ,tag_line ,body ,deadline } = req.body
        const note_data = await Note.create({
            user:req.user , title ,tag_line ,body ,deadline})
        res.status(200).json({success : true , note_data})
    }catch(err){
        res.status(501).json({success : false , error : "Error while creating the Note!"})
    }
})


router.get("/all-tags",fetchUser,async (req,res)=>{
    try{
        let notes_data = await Note.find({user : req.user , isPinned:false}).collation({locale:'en',strength: 2}).sort({tag_line:1})
        if(notes_data.length === 0){
            return res.status(200).json({success : true , tags : []})
        }
        let all_tags = []
        notes_data.map((ele) =>{
            all_tags.push(ele.tag_line)
        })
        let unique_tags = all_tags.filter((item, i, ar) => ar.indexOf(item) === i)
        res.status(200).json({success : true , tags : unique_tags})
    }catch(err){
        res.status(501).json({success : false , error : "Error while fetching all the Tags!"})
    }
})


router.get("/all-tags-note/:tag",fetchUser,async (req,res)=>{
    try{
        let tags_data = await Note.find({user : req.user , tag_line : req.params.tag , isPinned : false }).sort( { "createdAt": -1 } )
        if(tags_data.length === 0){
            return res.status(200).json({success : true , tags :[]})
        }
        res.status(200).json({success : true , tags : tags_data})
    }catch(err){
        res.status(501).json({success : false , error : "Error while fetching all the Tags!"})
    }
})


 
module.exports = router;