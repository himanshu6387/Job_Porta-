const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    role:{
        type:String,
        enum:['employee','employer'],
        default:'employee'
    },
    profileImage:{
        type:String,
        require:true,
    },
    resumeUrl:{
        type:String,
        require:true,
    },
    jobs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Job',
            require:true
        }
    ]
},{timestamps:true})



module.exports = mongoose.model('User',userSchema)

