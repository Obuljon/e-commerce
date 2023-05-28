import { Schema, model } from "mongoose";

const content = new Schema({
    wasseen:{type:Boolean,required:true},
    name:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String,required:true},
    subject:{type:String,required:true},
    message:{type:String,required:true},
}

)

export default model("content", content)

