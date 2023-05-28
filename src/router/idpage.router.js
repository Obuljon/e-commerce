import { Router } from "express";
import Pageid from "../controller/idpage.controller.js"
import validator from "../validator/validator.js"

const router = new Router();
router.get("/cart:id",  Pageid.cart)
router.get("/deletecart:id",Pageid.deletecart)
router.get("/singleshop:id",Pageid.shopsingle );
router.get("/updatecart",Pageid.updatecart)
router.get("/searchpage:_v",Pageid.searchpage)


router.post("/search",Pageid.search)
router.post("/content", validator.contentvalidator, Pageid.contentadd)

export default router

