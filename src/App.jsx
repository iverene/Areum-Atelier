import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Moodboard from "./pages/Moodboard";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/moodboard" element={<Moodboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
