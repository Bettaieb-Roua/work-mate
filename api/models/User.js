import mongoose,{Schema} from 'mongoose';

const UserSchema=mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:false,
        default:"https://cdn-icons-png.flaticon.com/512/219/219983.png"
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    roles:
    {
        type:[Schema.Types.ObjectId],
        required:true,
        ref:"Role"

    },

},
{
    timeStamps:true
});
export default mongoose.model("User",UserSchema);