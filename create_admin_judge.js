const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const UserModel = require("./src/models/UserModel");

const createUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB database");

        // Hash passwords
        const adminPassword = await bcrypt.hash("admin123", 10);
        const judgePassword = await bcrypt.hash("judge123", 10);

        // Check and Create Admin
        let adminUser = await UserModel.findOne({ email: "admin@codeverse.com" });
        if (!adminUser) {
            adminUser = await UserModel.create({
                firstName: "System",
                lastName: "Admin",
                email: "admin@codeverse.com",
                password: adminPassword,
                role: "admin",
                Status: "active"
            });
            console.log("Admin user created: admin@codeverse.com / admin123");
        } else {
            console.log("Admin user already exists.");
        }

        // Check and Create Judge
        let judgeUser = await UserModel.findOne({ email: "judge@codeverse.com" });
        if (!judgeUser) {
            judgeUser = await UserModel.create({
                firstName: "Expert",
                lastName: "Judge",
                email: "judge@codeverse.com",
                password: judgePassword,
                role: "judge",
                Status: "active"
            });
            console.log("Judge user created: judge@codeverse.com / judge123");
        } else {
            console.log("Judge user already exists.");
        }

        // Check and Create Participant
        const participantPassword = await bcrypt.hash("participant123", 10);
        let participantUser = await UserModel.findOne({ email: "participant@codeverse.com" });
        if (!participantUser) {
            participantUser = await UserModel.create({
                firstName: "Test",
                lastName: "Participant",
                email: "participant@codeverse.com",
                password: participantPassword,
                role: "participant",
                Status: "active"
            });
            console.log("Participant user created: participant@codeverse.com / participant123");
        } else {
            console.log("Participant user already exists.");
        }

    } catch (error) {
        console.error("Error creating users:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from database");
    }
};

createUsers();
