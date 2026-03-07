import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questions from "./pages/Questions";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/categories" element={<Categories/>}></Route>
        <Route path="/questions" element={<Questions/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;