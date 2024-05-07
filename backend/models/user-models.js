import mongoose from 'mongoose';
 const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    authority:{
        type:String,
        required:true
    }
 })
const User = mongoose.model('users',userSchema)
export default User;