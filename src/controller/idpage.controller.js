import goodsdb from "../model/goodsdb.js";
import userdb from "../model/userdb.js";
import contentdb from "../model/content.js"
import categoriesdb from "../model/caregories.js";
import { paginateArray, generateArray, findObjectById,  removeObjectAtIndex,} from "../helps/helps.js";

import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join( __dirname,'../../public/');  

class Pageid{
    async shopsingle(req, res){
        try {
            const id = req.params.id;
            const material = await goodsdb.findById(id);
            req.session.shopsingle = material
            res.render("main/shopsingle", { material, })  
        } catch (error) {
            console.log(error)
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }

    async cart(req ,res){
            try {
                const  { _id,name,number,image,price,color,size,categories,type} = req.session.shopsingle
                const cartitem =  { _id,name,number,image,price,color,size,categories,type, value:1} 
                if(req.session.carts){
                        const index = findObjectById(req.session.carts.items, req.params.id)
                        if(typeof index != "number"){
                            req.session.carts.items.push(cartitem)
                        }
                }else{
                    req.session.carts = {
                    items:[cartitem]
                        } 
                }
                res.redirect("/pagecart");   
            } catch (error) {
                console.log(error)
                res.sendFile(`${publicDirPath}oops.html`)
            }
    }
    // bu function userni cart:[{}, {}] belgilanganini o'chirib tashlaydi
    async deletecart(req, res){
        try {
            const index = findObjectById(req.session.carts.items, req.params.id)
            req.session.carts.items = removeObjectAtIndex(req.session.carts.items, index)
            res.redirect("/pagecart")
        } catch (error) {
            console.log(error)
            res.sendFile(`${publicDirPath}oops.html`) 
        }    
    }
    //bu function userni cart:[] mutloq bo'sh massiv qiladi
    async updatecart(req, res){
            req.session.carts.items = []
            res.redirect("/pagecart")
    }
    async search(req, res){
        try {
            const searchName = req.body.search.toLowerCase();
            const searchResults = await goodsdb.find({ name: { $regex: searchName, $options: "i" } });
            req.session.search = paginateArray(4,searchResults)            
            res.redirect("/searchpage1")
        } catch (error){
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
       
    }
    async searchpage(req, res){
        try {
            const pagenum = req.params._v - 1
            res.render("main/search", { sologoods:req.session.search[pagenum], indexgoods:generateArray(req.session.search.length) })
        } catch (error) {
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }

    async contentadd(req, res){
        try {
            req.body.wasseen = false;
            await contentdb.create(req.body);
            res.redirect("/")
        } catch (error) {
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }


}

export default new Pageid()