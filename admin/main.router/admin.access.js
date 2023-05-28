import { Router } from "express";
import accessController from "../controller/access.controller.js";
import validator from "../validator/validator.js";
const router = new Router();

router.get("/updatepassword", accessController.isAuth, accessController.updatepassword)
router.get("/access", accessController.adminpage)
router.get("/logout",  accessController.logout)
router.post("/access",accessController.welcomeadmin)
router.post("/updatepassword", validator.updateadmin, accessController.isAuth, accessController.updatenewpassword)


export default router;
