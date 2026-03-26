const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const resetPasswordMailSend = require("../utils/ResetPasswordMailUtil")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const registerUser = async (req, res) => {
    try {

        console.log(req.body)

        const hasedPassword = await bcrypt.hash(req.body.password, 10)

        const savedUser = await userSchema.create({ ...req.body, password: hasedPassword })
        await mailSend(savedUser.email,"welcome to our app", savedUser.firstName)
        res.status(201).json({
            message: "user created suceessfully",
            data: savedUser
        })
    } catch (err) {
        res.status(500).json({
            message: "error while creating user",
            err: err
        })
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const foundUserFromEmail = await userSchema.findOne({ email: email })
        if (foundUserFromEmail) {
            const isPasswordMatched = await bcrypt.compare(password, foundUserFromEmail.password)

            if (isPasswordMatched) {
                const token = jwt.sign(
                    { id: foundUserFromEmail._id, role: foundUserFromEmail.role }, 
                    process.env.JWT_SECRET || "codeverse_secret", 
                    { expiresIn: "10d" }
                );

                res.status(200).json({
                    message:"Login Success",
                    data:foundUserFromEmail,
                    role:foundUserFromEmail.role,
                    token: token
                })

            }
            else{
                res.status(401).json({
                    message:"Invaild Credentials"
                })
            }
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "error while loggin in",
            err: err
        })
    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        await resetPasswordMailSend(user.email, "CodeVerse Password Reset", resetUrl, user.firstName);

        res.status(200).json({ message: "Password reset link sent to your email" });

    } catch (err) {
        console.error("Forgot Password Error: ", err);
        res.status(500).json({ message: "Error sending reset email", err });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await userSchema.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired password reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.error("Reset Password Error: ", err);
        res.status(500).json({ message: "Error resetting password", err });
    }
}

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}