import { Router } from "express";
import { signin } from "../controllers/user.controller";
const userRouter = Router();

userRouter.post("/signin", signin);

export default userRouter;