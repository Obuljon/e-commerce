import { Schema, model } from "mongoose"

const userdb = new Schema({
        fname:{type:String,required:true},
        lname:{type:String,required:true},
        companyname:{type:String,required:true},
        region:{type:String,required:true},
        district:{type:String, required:true},
        address:{type:String,required:true},
        email_address:{type:String,required:true},
        phone:{type:String,required:true},
        order_notes:{type:String,required:true},
        cartanum:{type:Number,required:true},
        cartapassword:{type:Number,required:true},
        delivered:{type:Boolean,required:true},
        cart:{
            type:[],required:true,
        },
    },
    {
        timestamps:true
    }
)

export default model("users", userdb)


        