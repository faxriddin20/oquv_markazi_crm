import { Router } from "express";
import { addCenter, addDepartments, addDirections, addGroups, addPosition, addUser, changeDepartment, changeDirections, changeGroup, changePosition, changeUser, delDepartement, delDirection, delGroups, delPositions, delUser, getDepartement, getDepartementbyId, getDirectionByID, getDirections, getGroups, getGroupsByID, getPositions, getPositionsbyId, getUsers, loginAdmin } from "../controllers/admin.controller.js";
export const aRouter = Router()
aRouter
    .post("/login",loginAdmin)
    .post("/center",addCenter)
    .post("/departemen",addDepartments)
    .post("/position",addPosition)
    .post("/users",addUser)
    .post("/direction",addDirections)
    .post("/group",addGroups)
    .delete("/group/:id",delGroups)
    .delete("/users/:id",delUser)
    .delete("/position/:id",delPositions)
    .delete("/departemen/:id",delDepartement)
    .delete("/direction/:id",delDirection)
    .get("/users",getUsers)
    .get("/department/:id",getDepartementbyId)
    .get("/department",getDepartement)
    .get("/department/direction/:id",getDirectionByID)
    .get("/directions",getDirections)
    .get("/department/positions/:id",getPositionsbyId)
    .get("/positions",getPositions)
    .get("/groups/:id",getGroupsByID)
    .get("/groups",getGroups )
    .put("/department/:id",changeDepartment)
    .put("/direction/:id",changeDirections)
    .put("/position/:id",changePosition)
    .put("/groups/:id",changeGroup)
    .put("/user/:id",changeUser)
