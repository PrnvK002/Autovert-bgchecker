import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import {
  getApplicants,
  submitInfo,
  getUser,
  getApplicant,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { infoSchema } from "../validation/user.validation";
import { restrictedAccess } from "../middlewares/restricter.middleware";

const router = Router();

//@desc route for submit info from applicant
//@access public
router.put(
  "/infosubmit",
  authenticationMiddleware,
  validateBody(infoSchema),
  submitInfo
);

//@desc route for gettting applicants
//@access admin
router.get(
  "/applicants",
  authenticationMiddleware,
  restrictedAccess,
  getApplicants
);

//@desc route for gettting applicants
//@access admin
router.get(
  "/applicant/:id",
  authenticationMiddleware,
  restrictedAccess,
  getApplicant
);

//@desc router for getting user info
//@access public
router.get("/", authenticationMiddleware, getUser);

export default router;
