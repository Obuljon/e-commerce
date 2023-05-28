import goodsdb from "../model/goodsdb.js";
import userdb from "../model/userdb.js";
import notice from "../model/notice.js";
import contentdb from "../model/content.js"
import { numproducts } from "../helps/produts.js";
import { uzbekiston } from "../helps/viloyat.js";
import {notice_id , mainpage_id, searchtext } from "../../admin/helps/infocrud.js"
import categoriesdb from "../model/caregories.js";
import { findObjectById, updateObjectAtIndex, removeObjectAtIndex,} from "../helps/helps.js";

import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join( __dirname,'../../public/');  


class Api{
    async pluscart(req, res){
        try {
            const { _id,name,number,image,price,color,size,categories,type} = req.session.shopsingle
            const cartitem = { _id,name,number,image,price,color,size,categories,type, value: 1}
            let resultnum = 1
            if(req.session.carts){
                const itemextant = findObjectById(req.session.carts.items, _id);
                if(typeof itemextant == "number"){
                    cartitem.value = req.session.carts.items[itemextant].value + 1
                    resultnum = cartitem.value
                    req.session.carts.items = updateObjectAtIndex(req.session.carts.items, itemextant,cartitem )
                    resultnum = req.session.carts.items[itemextant].value
                }else{
                    req.session.carts.items.push(cartitem)
                }
            }else{
                req.session.carts = {
                    items:[cartitem]
                    }
            }
            res.json(resultnum)
        } catch (error) {
            console.log(error)
        }
    }
    async minuscart(req, res){
        const { _id } = req.session.shopsingle
        const itemextant = findObjectById(req.session.carts.items, _id);
        const cartitem = req.session.carts.items[itemextant]
        let resultnum = 1;
        if(typeof itemextant == "number"){
            if(cartitem.value > 1){
                cartitem.value -= 1
                resultnum = cartitem.value
                req.session.carts.items = updateObjectAtIndex(req.session.carts.items, itemextant,cartitem )
            }else{
                req.session.carts.items = removeObjectAtIndex(req.session.carts.items, itemextant)
                resultnum = 0
            }
        }else{
            resultnum = 0
        }
        res.json(resultnum)
    }



    async categorienumbers(req, res){
        const data = await goodsdb.aggregate([
            { $group: {
              _id: null,
              ayollar: { $sum: { $cond: [{ $eq: ["$categories", "ayollar"] }, 1, 0] } },
              bolalar: { $sum: { $cond: [{ $eq: ["$categories", "bolalar"] }, 1, 0] } },
              erkaklar: { $sum: { $cond: [{ $eq: ["$categories", "erkaklar"] }, 1, 0] } }
            }}
          ])
          res.json(data)
    }
    async order(req, res){
        try {
            req.session.carts.items.forEach(async item => {
                item.number -= item.value  
                await goodsdb.findByIdAndUpdate(item._id, { $set: { "number": item.number } })
            })
            req.body.delivered = false;
            req.body.cart = req.session.carts.items
            req.session.carts.items = []
            await userdb.create(req.body)
            res.json({result:true, url:"thankyou"})
            
        } catch (error) {
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }

    region(req, res){
        try {
                const districts = uzbekiston[req.params.regionname]
                res.json(districts)
        }catch (error) {
            console.log(error)
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }

    async categories(req, res){
        const categories = await categoriesdb.find()
        res.json(categories)
    }
    async products(req, res){
        const notic = await notice.find();
        const products = await goodsdb.find({_id:{$in:notice_id(notic)}})
        res.json(products)
    }
   
}
export default new Api()
