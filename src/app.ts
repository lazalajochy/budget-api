import express, {Express} from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import userRouter from "./routes/auth.routes";
import passportMiddlewares from "./middlewares/passport";
import passport from "passport";
import cors from "cors";
import categoryRouter from "./routes/category.routes";
import incomeRouter from "./routes/income.route";

dotenv.config();
const app: Express  = express();
app.set("port", process.env.PORT || 4500);
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));


const allowedOrigins = [process.env.urlApp,"http://localhost:5173"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

console.log("test-running")
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddlewares)

app.use(userRouter);
app.use(categoryRouter);
app.use(incomeRouter);
export default app;