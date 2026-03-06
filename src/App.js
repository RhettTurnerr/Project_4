import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questions from "./pages/Questions";
import Categories from "./pages/Categories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/categries" element={<Categories/>}></Route>
        <Route path="/questions" element={<Questions/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;