import goodsdb from "../modul/goodsdb.js"
import notice from "../modul/notice.js";
import userdb from "../../src/model/userdb.js";
import categoriesdb from "../modul/caregories.js"
import contentdb from "../modul/content.js"
import {  notice_id, mainpage_id } from "../helps/infocrud.js"
import {generateArray, paginateArray} from "../../src/helps/helps.js"

class Admin{
    homepage(req, res){
        res.render("admin/home")
    }
    charts(req, res){
        res.render("admin/charts")
    }
    async content(req, res){
        try {
            const pagenum = req.params._v - 1
            const pagesize = 6;
            const totalCount = await contentdb.countDocuments(); // Get total document count
            const totalPages = Math.ceil(totalCount / pagesize);
            const skip = pagenum * pagesize;
        
            let contentdata = await contentdb.find().skip(skip).limit(pagesize);
            const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);
            
            res.render("admin/content", {content:contentdata, pagenetion})
            if(contentdata.length > 0){
                contentdata.forEach(async el => {
                    if(!el.wasseen){
                        el.wasseen = true
                        await contentdb.findByIdAndUpdate(el.id, el)
                    }
                });
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        
    }
    async cards(req, res){
        const users = await userdb.find()
        res.render("admin/cards", { users })
    }
    formelements(req, res){
        res.render("admin/formelements")
    }
    async editpage(req, res){
        try {
            const goods = await goodsdb.findById(req.params.id)
            res.render("admin/edit", { goods } )
        } catch (error) {
            console.error(error)
            res.send(error)
        }
    }
    async tables(req, res){
        const pageNumber = req.params._v - 1 // Requested page number (default to 1)
        const pageSize = 6; // Number of documents per page
      
       const caregories = {woman:"ayollar",man:"erkaklar",children:"bolalar"} 
        try {
          const totalCount = await goodsdb.countDocuments({"categories":caregories[req.params.categores]}); // Get total document count
          // Calculate total page count
          const totalPages = Math.ceil(totalCount / pageSize);
          // Calculate skip value
          const skip = pageNumber * pageSize;
          // Retrieve documents for the requested page
          const documents = await goodsdb.find({"categories":caregories[req.params.categores]})
            .skip(skip)
            .limit(pageSize)
      
          // Generate page numbers array
          const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);
          // Generate pagination object
          
          res.render("admin/tables",{ goods:documents, pagenetion, caregories:req.params.categores })
          // Send response to the frontend
        //   return res.json({ documents, pagination });
        } catch (err) {
          console.log('Error retrieving documents:', err);
          return res.status(500).json({ message: 'Server error.' });
        }
   }
 

    async settings(req, res){
        try {
            const categories = await categoriesdb.find()
            const notic = await notice.find()
            const mainpageId = mainpage_id(notic)
            const goods = await goodsdb.find({"_id":{$in:notice_id(notic)}})
            let mainpage
            if(mainpageId){
                mainpage = await goodsdb.findById(mainpageId.goods_id)
            }else{
                mainpage = {}
            }
            res.render("admin/settings", { goods, mainpage, categories })
            } catch (error) {
                console.log(error)
                res.send(error)
            }
    }
    async indetail(req, res){
        const data = await userdb.findById(req.params.id);
        res.render("admin/indetail",{ data })
    }
    async newcontentnum(req, res){
        const data = await contentdb.find({wasseen:false})
        res.json(data.length)
    }
  
}

export default new Admin();

