import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { restrictedAccess } from "../middlewares/restricter.middleware";
import { getTemplate,addTemplate } from "../controllers/template.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { addtemplateSchema } from "../validation/template.validation";

const router = Router();

//@desc route for getting template info
//@access admin
router.get('/',authenticationMiddleware,restrictedAccess,getTemplate)

//@desc route for getting template info
//@access admin
router.post('/create',authenticationMiddleware,restrictedAccess,validateBody(addtemplateSchema),addTemplate);

export default router;