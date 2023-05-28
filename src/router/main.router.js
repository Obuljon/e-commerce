import { Router } from "express";
import Main from "../controller/main.controller.js";
const router = new Router();

router.get("/", Main.homePage);
router.get("/shop/:_price/:_size/:_gender/:_type/:_vs", Main.shoppage);
router.get("/contant", Main.contact);
router.get("/pagecart", Main.pagecart);
router.get("/order", Main.order);
router.get("/thankyou", Main.thankyou);

export default router



