import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import DebatePage from './pages/DebatePage'
import SurveyPage from './pages/SurveyPage'
import NewsFeedPage from './pages/NewsFeedPage'
import AnalyticsPage from './pages/AnalyticsPage'
import LegislationPage from './pages/LegislationPage'
import CongressPage from './pages/CongressPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/debate" element={<DebatePage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/news" element={<NewsFeedPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/legislation" element={<LegislationPage />} />
            <Route path="/congress" element={<CongressPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App