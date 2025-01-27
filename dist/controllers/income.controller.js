"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncomes = exports.addIncome = void 0;
const income_1 = __importDefault(require("../models/income"));
const addIncome = async (req, res) => {
    try {
        const user = req.user;
        const { salary, job_title } = req.body;
        const newIncome = new income_1.default({
            salary,
            job_title,
            createdBy: user._id
        });
        await newIncome.save();
        res.status(201).json({ msg: newIncome });
    }
    catch (error) {
        console.log(error);
    }
};
exports.addIncome = addIncome;
const getIncomes = async (req, res) => {
    try {
        const user = req.user;
        const incomes = await income_1.default.find({ createdBy: user._id });
        res.status(200).json({ msg: incomes });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getIncomes = getIncomes;
