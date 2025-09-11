import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBanner from '../components/StatsBanner';
import FeatureCards from '../components/FeatureCards';
import SearchBar from '../components/SearchBar';
import LiveNewsFeed from '../components/LiveNewsFeed';
import TrendingTopics from '../components/TrendingTopics';
import PollsWidget from '../components/PollsWidget';
import LegislationFeed from '../components/LegislationFeed';
import CongressLive from '../components/CongressLive';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatsBanner />
      <FeatureCards />
      <SearchBar />
      <LiveNewsFeed />
      <TrendingTopics />
      <PollsWidget />
      <LegislationFeed />
      <CongressLive />
      <Footer />
    </div>
  );
};

export default HomePage;