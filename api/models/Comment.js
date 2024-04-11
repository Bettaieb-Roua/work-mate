import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
    { 
        comment:{
            type:String,
            required:true
        }
        

},
{
    timestamps:true
}
);
export default mongoose.model("Comment",CommentSchema);