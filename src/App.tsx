import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ChatPage from "./pages/ChatPage";
import DebatePage from "./pages/DebatePage";
import SurveyPage from "./pages/SurveyPage";
import NewsFeed from "./pages/NewsFeed";
import SocialPage from "./pages/SocialPage";
import FriendsPage from "./pages/FriendsPage";
import AuthModal from "./components/auth/AuthModal";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/social" element={<SocialPage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/debate" element={<DebatePage />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/news" element={<NewsFeed />} />
              </Routes>
            </main>
            <Footer />
            <AuthModal />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;