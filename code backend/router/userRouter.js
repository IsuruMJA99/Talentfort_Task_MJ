const express = require('express');
const router = express.Router();
const userD = require('../model/usermoel');
const dbconnection = require('../db');
const cors = require('cors');

router.use(cors());

router.post('/newuser', async (req, res) => {
    try {
        await dbconnection();

        const existUser = await userD.findOne({
            email: req.body.email
        });

        if (existUser) {
            console.log("You are already a user");
            res.status(400).json({ success: false, message: "User already exists" });
        } else {
            const getNewUser = new userD({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            const newUser = await getNewUser.save();
            if (newUser) {
                console.log('Registration successful');
                res.status(200).json({ success: true, message: "Registration successful" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        await dbconnection();

        const existUser = await userD.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (existUser) {
            console.log("Login successful");
            res.status(200).json({ success: true, message: "Login successful" });
        } else {
            console.log("Invalid credentials");
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post('/profile', async (req, res) => {
    try {
        await dbconnection();
        const existsUser = await userD.findOne({
            email: req.body.email
        });

        if (existsUser) {
            console.log('User profile fetched successfully');
            console.log('User profile:', {
                name: existsUser.name,
                email: existsUser.email
            });
            res.status(200).json({
                success: true,
                message: "User profile fetched successfully",
                user: {
                    name: existsUser.name,
                    email: existsUser.email
                }
            });
        } else {
            console.log("User not found");
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
