import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    companyNRole :{
        type :String,
        required : true,
    },
    connect : [{ type : String , required:true}],
    content : { type : String , required : true},
    imageUrl : {type : String , required : true},
    difficulty:{ type : Number , required : true },
    userOwner : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },


   












})




export const ReviewModel = mongoose.model("reviews",ReviewSchema);