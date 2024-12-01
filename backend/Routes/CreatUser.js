const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;


router.post("/creatuser",
    [
        body('name').isLength({ min: 5 }),       //This is for apply validation using express-validator
        body('email').isEmail(),
        body('password', 'Password is to short.').isLength({ min: 5 })

    ], async (req, res) => {

        const errors = validationResult(req);                     //This is check that the apply validation is conatain any error.
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
                location: req.body.location
            })

            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })



router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Password is to short.').isLength({ min: 5 })

    ], async (req, res) => {

        const errors = validationResult(req);                     //This is check that the apply validation is conatain any error.
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let email = req.body.email;        //This data is come from user at time of login.
        let password = req.body.password;

        try {
            let userData = await User.findOne({ email });  //This data come from database;

            if (!userData) {
                return res.status(400).json({ errors: "Email does't exist." });
            }

            const pwdCompare = await bcrypt.compare(password, userData.password);

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }


            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);   //In this toke we send the header ,data which is unique ,and a signature.

            return res.json({ success: true, authToken: authToken });


        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;