import { Schema, model } from "mongoose";

const categories = new Schema({
    name:{type:String, required:true},
    image:{type:String, required:true}
})

export default model("categories", categories)

