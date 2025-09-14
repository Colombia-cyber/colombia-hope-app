import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ChatPage from "./pages/ChatPage";
import DebatePage from "./pages/DebatePage";
import SurveyPage from "./pages/SurveyPage";
import NewsFeed from "./pages/NewsFeed";
import LegislationPage from "./pages/LegislationPage";
import CongressPage from "./pages/CongressPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/legislation" element={<LegislationPage />} />
            <Route path="/congress" element={<CongressPage />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/debate" element={<DebatePage />} />
            <Route path="/survey" element={<SurveyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;