import { Request, Response, NextFunction } from "express";

export const restrictedAccess = (req: any, res: Response, next: NextFunction) => {
  console.log("req.user",req.user);
  
  if(req.user.role === 'Admin'){
    next();
  }else{
    const error = new Error(`Access Restricted`);
    res.status(403);
    next(error);
  }
};