require("dotenv").config();

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../database");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

router.post("/register", async (req, res) => {
  const {email, password } = req.body;

  try {
    const [existing] = await db.query(
      "select * from users where email = ?",
      [email],
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await db.query(
      "insert into users (email, password_hash) values (?, ?)",
      [email, hashedPass],
    );
    res.json({ message: "User successfully registrated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("select * from users where email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
});

router.get('/profile', auth, (req,res)=> {
  res.json({
    message: 'you are logged in',
    user: req.user
  });
});

module.exports = router;
