import elementdb from "../modul/goodsdb.js";
import categoriesdb from "../modul/caregories.js"

import { renameAndReturnFileName, therefileunlinkSync, deletefile,  } from "../helps/filesestem.js"
import { mainpage_id } from "../helps/infocrud.js";
import goodsdb from "../modul/goodsdb.js";
import userdb from "../../src/model/userdb.js";

import notice from "../modul/notice.js";
import { fileURLToPath } from 'url';
import path from 'path';
import contentdb from "../modul/content.js";
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)),'../..');
class Crut{
    async addgoods(req, res){
        try {
            if(req.file == undefined){
                req.flash("errors", ["file must not be empty"])
                res.redirect("/formelements")
            }else{
                const filenama = renameAndReturnFileName(req);
                if(filenama == false){
                    return res.send(filenama);
                }
                req.body.image = filenama;
                await elementdb.create(req.body);
                res.redirect("/");
            }
        } catch (error) {
            console.error(error);
            res.status(404).sendFile(__dirname + '/public/404.html');
            
        }

    }
    async editgoods(req, res){
        try {
            const id = req.params.id;
            const goods = await goodsdb.findById(id);
            req.body.image = therefileunlinkSync(req, goods.image);
            await goodsdb.findByIdAndUpdate(id, req.body);
            res.redirect("/")
        } catch (error) {
            console.error(error)
            res.status(404).sendFile(__dirname + '/public/404.html');
        }
    }
    async deletagoods(req, res){
        try {
            const id = req.params.id
            const goods = await goodsdb.findById(id)
            await goodsdb.findByIdAndRemove(id)
            await deletefile(goods.image)
            res.redirect("/")
        } catch (error) {
            console.info(error)
            res.status(404).sendFile(__dirname + '/public/404.html');
        }
    }
    async addAnAd(req, res){
        const id = req.params.id;
        await notice.create({main:false,goods_id:id})
        res.redirect("/settings")
    }
    async cachedelete(req, res){
        const id = req.params.id;
        await notice.deleteOne({goods_id:id});
        res.redirect("/settings")
    }
    async maininstallpage(req, res){
        try {
            const notic = await notice.find()
        const ifAny = mainpage_id(notic)
        if(ifAny){
            await notice.updateOne({"goods_id":ifAny.goods_id}, {"main":false})
        }
        const id = req.params.id;
        await notice.updateOne({"goods_id":id}, {"main":true})
        res.redirect("/settings")
        } catch (error) {
            console.log(error)
            res.status(404).sendFile(__dirname + '/public/404.html');
        }
        
    }
    async categorieseditpage(req, res){
        const id = req.params.id;
        const categoriese = await categoriesdb.findById(id);
        res.render("admin/categoriesedit", { categoriese })
    }
    async categoriesedit(req, res){
        try {
            const id = req.params.id;
            const caregories = await categoriesdb.findById(id)
            req.body.image = therefileunlinkSync(req, caregories.image)
            await categoriesdb.findByIdAndUpdate(id, req.body);
            res.redirect(`/categoriesedit${id}`)
        } catch (error) {
            console.error;
            req.send(error)
        }
    }
    async contentdel(req, res){
        try {
            await contentdb.deleteOne({"_id":req.params.id})
            res.redirect("/content1")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
        
    }
    async delivered(req, res){
        try {
            const update = await userdb.findById(req.params.id);
            update.delivered = true
            await userdb.findByIdAndUpdate(req.params.id,update )
            res.redirect("/cards")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    async cartdelete(req, res){
        try {
            await userdb.findByIdAndRemove(req.params.id);
            res.redirect("/cards")
        } catch (error) {
            console.log(error);
            res.sent(error)
        }
    }
}
export default new Crut();

