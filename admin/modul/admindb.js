import { Schema, model } from "mongoose";

const admin = new Schema({
    password:{type:String, required:true}
})

export default model("admin", admin)



