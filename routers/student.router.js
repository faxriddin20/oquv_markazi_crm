import { Router } from "express";
import { getStudentDatas, loginStudent } from "../controllers/student.controller.js";
export const stRouter = Router()
stRouter
    .post("/login",loginStudent)
    .get("/",getStudentDatas)