import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const key = process.env.SECERTKEY;
export const saltNum = process.env.SALTNUM;