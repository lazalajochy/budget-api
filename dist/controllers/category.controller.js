"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.addCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const addCategory = async (req, res) => {
    try {
        const user = req.user;
        const { name, description } = req.body;
        const newCategory = new category_1.default({
            name,
            description,
            createdBy: user._id
        });
        await newCategory.save();
        res.status(201).json({ msg: newCategory });
    }
    catch (error) {
        console.log(error);
    }
};
exports.addCategory = addCategory;
const getCategories = async (req, res) => {
    try {
        const user = req.user;
        const categories = await category_1.default.find({ createdBy: user._id });
        res.status(200).json({ msg: categories });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getCategories = getCategories;
