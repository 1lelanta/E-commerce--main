const PORT = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Ensure upload folder exists
const uploadPath = path.join(__dirname, 'upload/images');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://lelanta:12345lelantabro@cluster0.adbu7nd.mongodb.net/e-commerce");

app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Multer config
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`
  });
});

// Models
const Product = mongoose.model("product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

const Users = mongoose.model('users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now }
});

// Middleware: fetchUser
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ errors: "please authenticate using valid token" });

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: 'please authenticate using valid token' });
  }
};

// Routes
app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false, errors: 'existing user found with the same email address' });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const token = jwt.sign({ user: { id: user._id } }, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, errors: "wrong email id" });
  if (req.body.password !== user.password) return res.json({ success: false, errors: "wrong Password" });

  const token = jwt.sign({ user: { id: user._id } }, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, id: req.body.id });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    let userData = await Users.findById(req.user.id);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let itemId = req.body.itemId;
    if (userData.cartData[itemId] !== undefined) userData.cartData[itemId] += 1;
    else userData.cartData[itemId] = 1;

    await userData.save();
    res.json({ success: true, message: "Item added to cart" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/newcollections', async (req, res) => {
  let newcollection = await Product.find().sort({ date: -1 }).limit(8);
  res.send(newcollection);
});

app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
