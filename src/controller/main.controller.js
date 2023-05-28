import goodsdb from "../model/goodsdb.js";
import notice from "../model/notice.js";
import categoriesdb from "../model/caregories.js";
import { paginateArray, generateArray, gender, size,getNumsFromString,type } from "../helps/helps.js";
import userdb from "../model/userdb.js";
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join( __dirname,'../../public/'); 

class Main{
    async homePage(req, res){
        const notic = await notice.findOne({main:true});
        const mainpage = await goodsdb.findById(notic.goods_id)
        res.render("main/home", { mainpage })
    }
    async shoppage(req, res){
        const pageNumber = req.params._v - 1 // Requested page number (default to 1)
        const pageSize = 6; // Number of documents per page
      
        try {
            
            
            const mainhref = req.params
            const _size = size(req.params._size) ;
            const _gender = gender(req.params._gender)
            const _type = type(req.params._type);
            const totalCount = await goodsdb.countDocuments({
                categories:{$in:_gender},
                size:{$in:_size},
                price:getNumsFromString(req.params._price),
                type:{$in:_type}
            }); // Get total document count
            const totalPages = Math.ceil(totalCount / pageSize);
            const skip = pageNumber * pageSize;
            const goods = await goodsdb.find(
                {
                    categories:{$in:_gender},
                    size:{$in:_size},
                    price:getNumsFromString(req.params._price),
                    type:{$in:_type}
                }).skip(skip).limit(pageSize); 
                const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);  // malumotlarni paginetion ga boldim
        res.render("main/shop", { goods, pagenetion,  mainhref,  })
        } catch (error) {
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
            }
    contact(req, res){
        res.render("main/contact")
    }
    pagecart(req, res){
        res.render("main/cart", {cart:req.session.cart})
    }
    order(req, res){
        try {
            if(req.session.carts){
                res.render("main/order")
            }else{
                res.redirect("/shop/all/all/all/all/1")
            }
        } catch (error) {
            console.log(error);
            res.sendFile(`${publicDirPath}oops.html`)
        }
    }
    thankyou(req, res){
        res.render("main/thankyou")
    }
   
}

export default new Main()



