"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const category_controller_1 = require("../controllers/category.controller");
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("/category", passport_1.default.authenticate("jwt", { session: false }), category_controller_1.addCategory);
categoryRouter.get("/category", passport_1.default.authenticate("jwt", { session: false }), category_controller_1.getCategories);
exports.default = categoryRouter;
