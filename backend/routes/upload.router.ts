import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import { fileUpload } from "../controllers/upload.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post('/file',authenticationMiddleware,upload.single('file'),fileUpload)

export default router;