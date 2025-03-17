"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const income_route_1 = __importDefault(require("./routes/income.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 4500);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
const allowedOrigins = [process.env.urlApp, "http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express_1.default.json());
app.use(passport_2.default.initialize());
passport_2.default.use(passport_1.default);
app.use(auth_routes_1.default);
app.use(category_routes_1.default);
app.use(income_route_1.default);
exports.default = app;
