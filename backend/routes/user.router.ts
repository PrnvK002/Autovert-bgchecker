import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { getApplicants, submitInfo } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { infoSchema } from "../validation/user.validation";

const router = Router();

//@desc route for submit info from applicant
//@access public
router.post('/infosubmit',authenticationMiddleware,validateBody(infoSchema),submitInfo)

//@desc route for gettting applicants
//@access admin
router.get('/applicants',authenticationMiddleware,getApplicants)

export default router;