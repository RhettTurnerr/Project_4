import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return null;
    }
  }, [token]);

  useEffect(() => {
    api.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!selectedCategory) return;

    api
      .get(`/questions?category=${selectedCategory}`)
      .then((res) => setQuestions(res.data));
  }, [selectedCategory]);
  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Instrumental Questionare</h2>
        <p>
          Username: <strong>{email}</strong>
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {/* LEFT SIDE: Categories */}
      <div className="categories-panel">
        <h3 className="cat-header">Categories</h3>
        <ul className="category-item-container">
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="category-item"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE: Questions */}
      <div className="questions-panel">
        <hr />

        {!selectedCategory && <p>Select a Category to view its questions</p>}
        {selectedCategory && questions.length === 0 && (
          <p>No questions for this category</p>
        )}

        {selectedCategory && (
          <div>
            <h3>Questions</h3>
            <ul>
              {questions
                .filter((q) => q.category_id === selectedCategory)
                .map((q) => (
                  <li key={q.id}>
                    <p>Q: {q.question_text}</p>
                    <p>A: {q.answer_text}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
