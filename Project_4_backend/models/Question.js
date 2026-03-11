const db = require('../database');

const Question = {
  getAll() {
    return db.query("SELECT * FROM questions");
  },

  getById(id) {
    return db.query("SELECT * FROM questions WHERE id = ?", [id]);
  },

  getByCategory(categoryId) {
    return db.query(
      "SELECT * FROM questions WHERE category_id = ?",
      [categoryId]
    );
  },

  create(categoryId, questionText, answerText) {
    return db.query(
      "INSERT INTO questions (category_id, question_text, answer_text) VALUES (?, ?, ?)",
      [categoryId, questionText, answerText]
    );
  },

  update(id, categoryId, questionText, answerText) {
    return db.query(
      "UPDATE questions SET category_id = ?, question_text = ?, answer_text = ? WHERE id = ?",
      [categoryId, questionText, answerText, id]
    );
  },

  delete(id) {
    return db.query("DELETE FROM questions WHERE id = ?", [id]);
  }
};

module.exports = Question;