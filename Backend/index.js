const express = require("express");
const mongoose = require("mongoose");
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds

require('./models/User');
require('./models/OTP');

const app = express();
app.use(express.json());

const User = mongoose.model("User")
const OTP = mongoose.model("OTP")

const mongoURL = "mongodb+srv://limzihong216:Zs5coQJzuImi1l6x@cluster0.rifmx.mongodb.net/";
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.post('/send-otp', async (req, res) => {
    const { email, mode } = req.body;
    const oldEmail = await User.findOne({email:email});
    if (oldEmail) {
        res.send({status:"exist",data:"User already exists!!!"});
    }
    else{
        const existingOTP = await OTP.findOne({ email: email });
        let otp;
        let expiresAt;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'limzihong216@gmail.com',
                pass: 'ywrgprfruxfztuip'
            }
        });
        const mailOptions = (otp) => ({
            from: 'limzihong216@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        });

        if (existingOTP && new Date(existingOTP.expireAt) > new Date()) {
            otp = existingOTP.otp;
            expiresAt = existingOTP.expireAt;
            try{
                await transporter.sendMail(mailOptions(otp));
                res.send({status:"ok",data:"OTP Sent!"});
            }catch (error){
                res.send({ status: "error", data: "Server Error" });
            }
        }
        else{
            otp = otpGenerator.generate(3,{digits:true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false});
            expiresAt = new Date(Date.now() + 60 * 1000); 
            try{
                await OTP.create({
                    email:email,
                    otp:otp,
                    mode:mode,
                    expireAt:expiresAt,
                    createdAt:Date.now(),
                });
                await transporter.sendMail(mailOptions(otp));
                res.send({status:"ok",data:"OTP Sent!"});
            }catch (error){
                res.send({ status: "error", data: "Server Error" });
            }
        }
    }
});

app.post('/register', async (req, res) => {
    const { email, password, otp } = req.body;
    const otpDoc = await OTP.findOne({ email, otp });
    try{
        if (!otpDoc||otpDoc.mode!=='create') {
            res.send({status:"invalid",data:"Invalid OTP"});
        }
        else{
            await OTP.deleteOne({ _id: otpDoc._id }); // Optionally delete OTP after verification
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await User.create({
                email:email,
                password:hashedPassword
            });
            res.send({status:"ok",data:"OTP Verified!"});
        }
    }
    catch(error){
        res.send({ status: "error", data: "Server Error" });
        console.log(error);
    }
    // OTP is valid
});

app.post('/login', async (req, res) => {
    const {email,password} = req.body;
    const checkEmail = await User.findOne({email:email});
    try{
        const match = await bcrypt.compare(password, checkEmail.password);

        if(checkEmail && match){
            res.send({status:"ok",data:"Login Sucessfully!"});
        }
        else {
            res.send({status:"invalid",data:"Invalid account or password!"});
        }
    }catch (error){
        res.send({ status: "error", data: "Server Error" });
        console.log(error);
    }
});

app.listen(5001, () => {
    console.log(`Server is running`);
});