import { Router } from "express";
import apiController from "../controller/api.controller.js";
import validator from "../validator/validator.js";
const router = new Router();

router.get("/categories", apiController.categories);
router.get("/products", apiController.products);
router.get("/region:regionname", apiController.region)
router.get("/numbercategories", apiController.categorienumbers)
router.get("/pluscart",apiController.pluscart);
router.get("/minuscart", apiController.minuscart);


// router.post("/singleshop:id", apiController.shopsingleid)
router.post("/order", validator.ordervalidator,  apiController.order)
export default router