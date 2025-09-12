import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChatPage from "./pages/ChatPage";
import DebatePage from "./pages/DebatePage";
import SurveyPage from "./pages/SurveyPage";
import NewsFeed from "./pages/NewsFeed";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/debate" element={<DebatePage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/news" element={<NewsFeed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;