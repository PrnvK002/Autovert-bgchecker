import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { restrictedAccess } from "../middlewares/restricter.middleware";
import { addFields, getFields } from "../controllers/field.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { addfieldSchema } from "../validation/field.validation";

const router = Router();

//@desc route for getting field info
//@access admin
router.get("/", authenticationMiddleware, restrictedAccess, getFields);

//@desc route for updating new fields
//@access admin
router.post(
  "/create",
  authenticationMiddleware,
  restrictedAccess,
  validateBody(addfieldSchema),
  addFields
);

export default router;
