import { hash, compare } from "bcrypt"
import { fileURLToPath } from 'url';
import path from 'path';
import admindb from "../modul/admindb.js";
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)),'../..');

class Access{
    adminpage(req, res){
        res.sendFile(__dirname + '/public/password.html');
    }
    updatepassword(req, res){
        res.render("admin/updatepassword")
    }
    async updatenewpassword(req, res){
        try {
            if(res.locals.admin){
                const {oldpassword, newpassword} = req.body
                const admin = await admindb.find();
                const istrue = await compare(oldpassword, admin[0].password );
                if(istrue){
                    const hashnewpassword = await hash(newpassword, 10)
                    await admindb.updateOne({"_id": admin[0]._id}, {"password":hashnewpassword})
                    delete req.session.admin;
                    res.redirect("/");
                }else{
                    delete req.session.admin;
                    res.redirect("/");
                }
            }else{
                res.redirect("/");
            }
            
        } catch (error) {
            console.error;
            res.send(error)
        }
    }
    async welcomeadmin(req, res){
        try {
            const password = req.body.password
            const admin = await admindb.find()
            req.session.admin = await compare(password, admin[0].password);
            res.redirect("/")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
        
    }

    logout(req, res) {
        delete req.session.admin;
        res.redirect("/");
    }
    isAuth(req, res, next) {
        if (res.locals.admin) {
            next();
        } else {
            return res.redirect("/access");
        }
    }
}

export default new Access()

