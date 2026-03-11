const db = require('../database');

const Category = {
  getAll() {
    return db.query("SELECT * FROM categories");
  },

  getById(id) {
    return db.query("SELECT * FROM categories WHERE id = ?", [id]);
  },

  create(name, description) {
    return db.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description]
    );
  },

  update(id, name, description) {
    return db.query(
      "UPDATE categories SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
  },

  delete(id) {
    return db.query("DELETE FROM categories WHERE id = ?", [id]);
  }
};

module.exports = Category;