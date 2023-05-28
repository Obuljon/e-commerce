import { Router } from "express";
const router = new Router();
import Admin from "../controller/admin.controller.js";
import accessController from "../controller/access.controller.js";

router.get("/", accessController.isAuth, Admin.homepage)
router.get("/content:_v", accessController.isAuth, Admin.content)
router.get("/charts", accessController.isAuth, Admin.charts)
router.get("/cards", accessController.isAuth, Admin.cards)
router.get("/formelements", accessController.isAuth, Admin.formelements)
router.get("/edit:id", accessController.isAuth, Admin.editpage) 
router.get("/tables/:categores/:_v", accessController.isAuth, Admin.tables)
router.get("/settings", accessController.isAuth,  Admin.settings);
router.get("/indetail:id",accessController.isAuth,Admin.indetail)
router.get("/newcontentnum",accessController.isAuth,Admin.newcontentnum)


export default router



