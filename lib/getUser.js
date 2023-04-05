import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import User from "../models/User";

export default async function getUser(req, res) {
  const token = getCookie("token", { req, res });

  try {
    const data = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
    let user = await User.findById(data.userId);
    user = JSON.parse(JSON.stringify(user));
    return user;
  } catch (error) {
    return null;
  }
}