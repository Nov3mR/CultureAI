'use client';

import { useState } from 'react';
import ActivityRecommendations from '@/components/ActivityRecommendations';
import CountryRecommendations from '@/components/CountryRecommendations';
import Translator from '@/components/Translator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'activities' | 'countries' | 'translate'>('activities');
  const [userId] = useState('user123'); // Replace with actual user ID from auth

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✈️ CulturAI
          </h1>
          <p className="text-gray-600">Your AI-powered travel companion</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'activities'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              🎯 Activities
            </button>
            <button
              onClick={() => setActiveTab('countries')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'countries'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              🌍 Destinations
            </button>
            <button
              onClick={() => setActiveTab('translate')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'translate'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              🌐 Translate
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === 'activities' && <ActivityRecommendations userId={userId} />}
          {activeTab === 'countries' && <CountryRecommendations userId={userId} />}
          {activeTab === 'translate' && <Translator />}
        </div>
      </div>
    </main>
  );
}