const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const db = require("../database");

router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;

  try {
    const [result] = await Category.create(name, description);
    res.json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(500).json({ message: "Error creating category" });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await Category.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await Category.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category" });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, description } = req.body;

  try {
    await Category.update(req.params.id, name, description);
    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Category.delete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

module.exports = router;