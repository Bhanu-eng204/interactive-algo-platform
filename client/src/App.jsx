// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProblemPage from './pages/ProblemPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/problem" element={<ProblemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
