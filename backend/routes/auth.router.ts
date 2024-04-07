import { Router } from "express";
import { authLogin, createUser } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { createUserSchema,loginSchema } from "../validation/auth.validation";

const router = Router();

//@desc route for login permision
//@access public
router.post("/login",validateBody(loginSchema),authLogin)

//@desc route for creating user
//@access public
router.post("/createuser",validateBody(createUserSchema),createUser);

export default router;