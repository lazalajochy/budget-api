import { Router } from "express";
import passport from "passport";
import { addCategory, getCategories } from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/category", passport.authenticate("jwt", {session: false}), addCategory );
categoryRouter.get("/category", passport.authenticate("jwt", {session: false}), getCategories );
export default categoryRouter;