import jwt from "jsonwebtoken";

export default function generateToken(id:String):String {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "10d" });
}