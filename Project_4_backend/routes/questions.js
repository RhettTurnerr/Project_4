const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const db = require("../database");

router.post('/', auth, async (req, res) => {
  const { category_id, question_text, answer_text } = req.body;

  try {
    const [result] = await Question.create(category_id, question_text, answer_text);
    res.json({
      id: result.insertId,
      category_id,
      question_text,
      answer_text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating question" });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await Question.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await Question.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question" });
  }
});

router.get('/category/:categoryId', async (req, res) => {
  try {
    const [rows] = await Question.getByCategory(req.params.categoryId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions by category" });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { category_id, question_text, answer_text } = req.body;

  try {
    await Question.update(req.params.id, category_id, question_text, answer_text);
    res.json({ message: "Question updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating question" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Question.delete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question" });
  }
});

module.exports = router;