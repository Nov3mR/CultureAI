'use client';

import { useState, useEffect } from 'react';
import { getCountryRecommendations, getUserProfile, CountryRecommendation } from '@/lib/travelApi';
import { Compass, Globe, Languages, Sparkles, MapPin, Plane } from 'lucide-react';

export default function CountryRecommendations({ userId }: { userId: string }) {
  const [budget, setBudget] = useState<string>('100-300');
  const [travelStyle, setTravelStyle] = useState<string>('');
  const [recommendations, setRecommendations] = useState<CountryRecommendation[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserProfile(userId)
      .then(profile => {
        setVisitedCountries(profile.visited_countries || []);
      })
      .catch(console.error);
  }, [userId]);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      // Send numeric range instead of label
      const recs = await getCountryRecommendations(userId, budget, travelStyle);
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        <div className="p-8 text-center text-gray-600">
            <Globe className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-600">Country Recommendations</h3>
            <p>Find your next dream destination</p>
         </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-600">Discover Your Next Destination</h2>

      {visitedCountries.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-600">✈️ You've visited:</h3>
          <div className="flex flex-wrap gap-2">
            {visitedCountries.map(country => (
              <span
                key={country}
                className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* BUDGET SELECTION */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">💰 Daily Budget</label>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {[
              { label: '< $100/day', value: '<100' },
              { label: '$100 – $300/day', value: '100-300' },
              { label: '$300 – $600/day', value: '300-600' },
              { label: '$600+/day', value: '>600' }
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setBudget(opt.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  budget === opt.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* TRAVEL STYLE */}
        <div>
          <label className="block text-sm font-medium mb-2">🌍 Travel Style</label>
          <div className="flex flex-wrap gap-2">
            {['adventure', 'relaxation', 'cultural', 'foodie', 'beach', 'urban'].map(style => (
              <button
                key={style}
                onClick={() => setTravelStyle(style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  travelStyle === style
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGetRecommendations}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 disabled:bg-gray-300"
        >
          {loading ? '🌍 Finding your perfect destination...' : '🎯 Get Recommendations'}
        </button>
      </div>

      {/* RESULTS */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-600">Your Next Adventures</h3>
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-bold text-purple-600">{rec.country}</h4>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {rec.best_season}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{rec.reason}</p>

              <div className="mb-4">
                <h5 className="font-semibold mb-2 text-gray-600">✨ Highlights:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {rec.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">🎯 Best for:</span> {rec.best_for}
                </div>
                <div>
                  <span className="font-medium">💰 Estimated Budget:</span>{' '}
                  {rec.estimated_budget || budget}
                </div>
              </div>

              {rec.similar_to && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                  <span className="font-medium text-gray-600">🔗 Similar to:</span> {rec.similar_to}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

