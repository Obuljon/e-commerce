import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: 'public/uploads/' })
const router = new Router();
import validator from "../validator/validator.js";
import Crud from "../controller/admin.crud.controller.js";
import accessController from "../controller/access.controller.js";


router.post("/formelements", upload.single('image'),accessController.isAuth,  validator.add, Crud.addgoods)
router.post("/edit:id", upload.single('image'),accessController.isAuth,  validator.edit, Crud.editgoods )
router.get("/delete:id", accessController.isAuth, Crud.deletagoods)
router.get("/rek:id",accessController.isAuth, Crud.addAnAd)
router.get("/cachedelete:id",accessController.isAuth, Crud.cachedelete)
router.get("/installmainpage:id",accessController.isAuth, Crud.maininstallpage)
router.get("/contentdelete:id",accessController.isAuth, Crud.contentdel)
router.get("/delivered:id", accessController.isAuth, Crud.delivered)
router.get("/cartdelete:id",accessController.isAuth, Crud.cartdelete)

router.get("/categoriesedit:id",accessController.isAuth,Crud.categorieseditpage)
router.post("/categories/:id", upload.single('image'),accessController.isAuth, Crud.categoriesedit)

export default router;

