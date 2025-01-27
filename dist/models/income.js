"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const incomeSchema = new mongoose_1.Schema({
    salary: {
        type: Number,
        require: true
    },
    job_title: {
        type: String
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});
exports.default = (0, mongoose_1.model)("Incomes", incomeSchema);
