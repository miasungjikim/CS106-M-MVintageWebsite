const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const Product = require("./models/Product")
const app = express();
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const upload = multer({ storage: multer.memoryStorage() });

//account key & projectID
const storage = new Storage({
    keyFilename: path.join(__dirname, "key.json"),
    projectId: "coral-core-476021-d6",
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

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


// 2️⃣ Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    //find users as email   
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.json({ success: false, message: "Email not found" });
            }

            //compare pw
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Incorrect password" });
            }

            //after success login -> check roles
            if (user.role === "admin") {
                res.json({ success: true, role: "admin", redirect: "ad-orders.html", fullname: user.fullname, email: user.email });
            } else {
                res.json({ success: true, role: "user", redirect: "index.html", fullname: user.fullname, email: user.email });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false, message: "👾 SERVER ERROR" });
        });
});

//3️⃣ Products
//3-1. Read Single Product
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ messaage: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("ERROR GET", err);
        res.status(500).json({ message: "FAILED TO GET PRODUCT" });
    }
});

//Show all products
app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

//3-2. Create product
app.post("/api/products", async (req, res) => {
    try {
        const {
            name,
            price,
            categoryMain,
            categorySub,
            description,
            imageUrl,
            stockS,
            stockM,
            stockL,
            stockXL,
        } = req.body;

        //new product object
        const newProduct = new Product({
            name,
            price,
            category: { main: categoryMain, sub: categorySub },
            description,
            images: imageUrl ? [imageUrl] : [],
            sizes: [
                { size: "S", stock: stockS || 0 },
                { size: "M", stock: stockM || 0 },
                { size: "L", stock: stockL || 0 },
                { size: "XL", stock: stockXL || 0 },
            ],
        });

        //Save to DB
        const savedProduct = await newProduct.save(); //save to mongoDB 
        res.status(201).json(savedProduct); //server --> result --> client

    } catch (err) {
        console.error("ERROR CREATING PRODUCT", err);
        res.status(500).json({ message: "FAILED TO CREATE PRODUCT" });
    }
});



//3-3. update product
app.put("/api/products/:id", async (req, res) => {
    try {
        const {
            name,
            price,
            categoryMain,
            categorySub,
            description,
            imageUrl,
            stockS,
            stockM,
            stockL,
            stockXL,
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                category: { main: categoryMain, sub: categorySub },
                description,
                images: imageUrl ? [imageUrl] : [],
                sizes: [
                    { size: "S", stock: stockS || 0 },
                    { size: "M", stock: stockM || 0 },
                    { size: "L", stock: stockL || 0 },
                    { size: "XL", stock: stockXL || 0 },
                ],
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error("ERROR UPDATING PRODUCT", err);
        res.status(500).json({ message: "FAILED TO UPDATE PRODUCT" });
    }
});

//3-4 Image upload (google api storage)
app.post("/api/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "no file uploaded" });
        }

        const blob = bucket.file(Date.now() + "-" + req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: req.file.mimetype },
        });

        blobStream.on("error", (err) => {
            console.error("UPLOAD ERROR", err);
            res.status(500).json({ message: "Failed to upload image" });
        });

        blobStream.on("finish", async () => {

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.status(200).json({ imageUrl: publicUrl });
        });

        blobStream.end(req.file.buffer);


    } catch (err) {
        console.error("upload error", err);
        res.status(500).json({ message: "👾SERVER ERROR" })
    }
});

//3.5 Delete product api
app.delete("/api/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        console.error("DELETE ERROR", err);
        res.status(500).json({ message: "Failed to delete product" });
    }
});



//4️⃣ USERS ...
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Failed to fetch users:", err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
});




//(ALWAYS PUT AT THE END)START SERVER
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});