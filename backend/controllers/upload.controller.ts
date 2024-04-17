import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const fileUpload = asyncHandler(async (req:any,res:Response) => {
    console.log(req.file);
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file);
    if(result){
        res.status(200).json({ url : result.url });
    }else{
        res.status(500);
        throw new Error('An Error occured while uploading the image');
    }
})