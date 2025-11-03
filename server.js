const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const app = express();

//Connect mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("🤖 mongoDB connected"))
    .catch(err => conaole.log("👾 CONNECTION ERROR", err.message));

//bring PORT from .env (if there is not exits, bring 3000)
const PORT = process.env.PORT || 3000;

//PERMIT PORT (5500 -> 3000 ; CORS(Cross-origin resourcing sharing error))
app.use(cors());
//JSON body parsing (get JSON from fetch - front work)
app.use(express.json());
//'public' folder - use as static file 
app.use(express.static(path.join(__dirname, "public")));

//TEST API ENDPOINT
app.get("/api/signup-test", (req, res) => {
    res.json({
        ok: true,
        message: "API is working 🤖"
    });
});


//1️⃣ SIGN-UP API
app.post("/api/signup", (req, res) => {
    const { fullname, email, password, phone, address } = req.body;
    //pw hash
    const hashedPassword = bcrypt.hashSync(password, 10);

    //Create user object
    const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        phone,
        address
    });

    //SAVE
    newUser.save()
        .then(() => res.json({ success: true, message: "✅ User registered" }))
        .catch(err => res.json({ success: false, error: err.message }));
});







//(ALWAYS PUT AT THE END)START SERVER
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});