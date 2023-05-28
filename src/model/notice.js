import { Schema, model } from "mongoose";
const notice = new Schema( 
    {
    //mahsulot asosiy bolish kerakkmi yoki asosiy emasmi
    main:{
        type:Boolean,
        required:true
    },
    goods_id:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

export default model("notice", notice)

