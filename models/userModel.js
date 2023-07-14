const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog'
        }
    ]
},{timestamps:true});

module.exports = new mongoose.model('User',userSchema);