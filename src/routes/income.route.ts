import { Router } from "express";
import passport from "passport";
import { addIncome, getIncomes } from "../controllers/income.controller";
const incomeRouter = Router();

incomeRouter.post("/income", passport.authenticate("jwt", {session:false}), addIncome);
incomeRouter.get("/income", passport.authenticate("jwt", {session:false}), getIncomes)


export default incomeRouter;

//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