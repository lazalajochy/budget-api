"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const income_controller_1 = require("../controllers/income.controller");
const incomeRouter = (0, express_1.Router)();
incomeRouter.post("/income", passport_1.default.authenticate("jwt", { session: false }), income_controller_1.addIncome);
incomeRouter.get("/income", passport_1.default.authenticate("jwt", { session: false }), income_controller_1.getIncomes);
exports.default = incomeRouter;
