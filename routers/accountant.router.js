import { Router } from "express";
import { addIncomes, addOutlay, changeOutlays, delIncomes, delOutlays, getIncomes, getOutlays, loginAccountant, updateIncomes } from "../controllers/accountant.controller.js";
export const acRouter = Router()
acRouter
    .post("/outlay",addOutlay)
    .post("/login",loginAccountant)
    .post("/incomes",addIncomes)
    .get("/outlay",getOutlays)
    .get("/incomes",getIncomes)
    .put("/outlay/:id",changeOutlays)
    .put("/incomes/:id",updateIncomes)
    .delete("/incomes/:id",delIncomes)
    .delete("/outlays/:id",delOutlays)