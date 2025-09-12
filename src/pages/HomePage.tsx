import React from 'react'
import Hero from '../components/Hero'
import StatsBanner from '../components/StatsBanner'
import FeatureCards from '../components/FeatureCards'
import SearchBar from '../components/SearchBar'
import LiveNewsFeed from '../components/LiveNewsFeed'
import TrendingTopics from '../components/TrendingTopics'
import PollsWidget from '../components/PollsWidget'

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <StatsBanner />
      <FeatureCards />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchBar />
            </div>
            <div className="space-y-6">
              <LiveNewsFeed />
              <TrendingTopics />
              <PollsWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage