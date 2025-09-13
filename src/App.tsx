import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout";
import { HomePage } from "./pages";
import { ChatPage } from "./features/chat";
import { DebatePage } from "./features/debate";
import { SurveyPage } from "./features/survey";
import { NewsFeed } from "./features/news";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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