import request from "supertest";
import app from "../src/app";
import server from "../src/index";
import { connectDB, closeDB } from "../src/database"; 
import mongoose from "mongoose";

describe("Test Server", () => {
    let consoleSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>;

    beforeAll(async () => {
        consoleSpy = jest.spyOn(console, "log").mockImplementation();
        await connectDB();
    });

    afterAll(async () => {
        await server.close(); 
        await closeDB(); 
        consoleSpy.mockRestore();
    });

    test("Server should be running", async () => {
        expect(consoleSpy).toHaveBeenCalledWith(
            "Database connected successfully",
        );
    });
});
