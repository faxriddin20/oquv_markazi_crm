import { Router } from "express";
import { addCheck, changeCheck, getGroups, getGroupsByID, getUsersInClass, loginTeacher } from "../controllers/teacher.controller.js";
export const tRouter = Router()
tRouter
    .post("/login",loginTeacher)
    .post("/check",addCheck)
    .get("/groups",getGroups)
    .get("/students",getUsersInClass)
    .get("/groups/:id",getGroupsByID)
    .put("/check/:id",changeCheck)