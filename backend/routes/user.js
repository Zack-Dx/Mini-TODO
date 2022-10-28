const express = require("express")
const router = express.Router()
const User = require("../models/User")
const {body , validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const json_web_token = require("jsonwebtoken")
const JWT_SECRET = "@bh@y2is0@0good2boy"

router.post('/create-user',[
    body('Name',"Enter a valid name").isLength({min:5}),
    body('Email',"Enter a valid email").isEmail(),
    body('PhoneNumber',"Phone Number length should be 10").isLength({min:10 , max:10}),
    body('Password',"Enter a password of min length 5").isLength({min:5}) 
],async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({success : false , error:error.errors , validationError : true})
    }
    let admin = await User.findOne({Email : req.body.Email})
    if(admin){
        return res.status(400).json({success : false , message:"User Already Have An Account..."})
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password , salt)
        const admin = await User.create({
            Name : req.body.Name,
            Email :req.body.Email,
            Password :hashedPassword,
            PhoneNumber :req.body.PhoneNumber
        })
        return res.status(200).json({success: true , admin })
    }catch(err){
        return res.status(501).json({success : false , err})
    }
})
router.post('/login-user',[
    body('Email','Enter a valid email').isEmail(),
    body('Password','Enter a valid password with min length 5!').isLength({min:5})
], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({success : false , error:error.errors , validationError : true})
    }
    const {Email , Password} = req.body;
    try{
        const user_compare = await User.findOne({Email})
        if(!user_compare){
            return res.status(400).json({success  :false , type : 2, error:'User with this Email id does not exist' })
        }
        const passwordCompare = await bcrypt.compare(Password ,user_compare.Password)
        if(!passwordCompare){
            res.status(400).json({success :false,error:"Please Try To login With correct credentials" , type : 3})
        }
        const EXPIRES_IN = `2d`;
        const payload = {
            user_data:user_compare
        }
        const authToken = json_web_token.sign(payload , JWT_SECRET ,{
            expiresIn : EXPIRES_IN
        })
        res.status(200).json({success : true , authToken})
    }catch(err){
        res.status(501).json({success : false , error : err})
    }
})




module.exports = router;