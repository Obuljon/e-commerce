import { Schema, model } from "mongoose";

const goods = new Schema( 
    {
        // mahsulot nomi
        name: {             
            type: String,
            required: true
          },
          // mahsulot soni
        number: {
            type: Number,
            required: true
        },
        //mahsulot surati 
        image: {
            type: String,
            required: true
        },
        // mahsulot narhi
        price: {
            type: Number,
            required: true
        },
        // mahsulot rangi
        color: {
            type: String,
            required: true
        },
        // mahsulot hajmi katta,ortacha,kichik
        size: {
            type: String,
            required: true
        },
        // mahsulot ayol, erkaklar uchunmi yoki bolalar uchunmi shu to'grisida  
        categories: {
            type:String,
            required:true
        },
        //1.akssuarlar, 2.oyoq kiyimlar, 3.sumkalar, 4.ichki kiyimlar, 5.pastki kiyimlar, 6.bosh kiyimlar, 7.Ust kilar, 8.toplam rasmiy kiyimlar, 9.toplam sport kiyimlar, 10.toplam uy kiyimlar, 11.toplam mehnat kamarlar
        type:{
            type:String, 
            required:true
        },
    },
    {
        timestamps:true
    }
)

export default model("goods", goods)

