import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <div>
      <h2>Categories Page</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link to={`/questions?category=${cat.id}`}>{cat.name}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
