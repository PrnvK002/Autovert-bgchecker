import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { getVersionInfo, updateOrder } from "../controllers/version.controller";
import { restrictedAccess } from "../middlewares/restricter.middleware";
import { validateBody } from "../middlewares/validation.middleware";
import { updateorderSchema } from "../validation/version.validation";

const router = Router();

//@desc route for getting version info
//@access public
router.get("/", authenticationMiddleware, getVersionInfo);

//@desc route for updating order of render
//@access admin
router.post(
  "/order",
  authenticationMiddleware,
  restrictedAccess,
  validateBody(updateorderSchema),
  updateOrder
);

export default router;
