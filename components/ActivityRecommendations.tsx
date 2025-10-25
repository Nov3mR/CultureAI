// components/ActivityRecommendations.tsx
'use client';

import { useState } from 'react';
import { getActivityRecommendations, Activity } from '@/lib/travelApi';
import { Compass, Globe, Languages, Sparkles, MapPin, Plane } from 'lucide-react';

export default function ActivityRecommendations({ userId }: { userId: string }) {
    const [country, setCountry] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);

    const interestOptions = [
        'Adventure', 'Culture', 'Food', 'Nature', 'History',
        'Nightlife', 'Shopping', 'Relaxation'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const recommendations = await getActivityRecommendations(
                userId,
                country,
                interests
            );
            setActivities(recommendations);
        } catch (error) {
            console.error('Failed to get recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleInterest = (interest: string) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
              <div className="p-8 text-center text-gray-600">
                <Compass className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Activity Recommendations</h3>
                <p>Discover exciting activities at your destination</p>
              </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-600">Find Activities</h2>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4 text-gray-600">
                    <label className="block text-sm font-medium mb-2 text-gray-600">
                        Which country are you visiting?
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g., Japan, Italy, Thailand"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-600">
                        What are you interested in?
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {interestOptions.map((interest) => (
                            <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${interests.includes(interest)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !country}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? '🔍 Finding activities...' : '✨ Get Recommendations'}
                </button>
            </form>

            {/* Results */}
            {activities.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4 text-gray-600">
                        Recommended Activities in {country}
                    </h3>
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-xl font-semibold">{activity.name}</h4>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {activity.category}
                                </span>
                            </div>

                            <p className="text-gray-700 mb-4">{activity.description}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">📍 Location:</span> {activity.location}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">💰 Cost:</span> {activity.estimated_cost}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">🗓️ Best Time:</span> {activity.best_time}
                                </div>
                            </div>

                            {activity.tips && (
                                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                    <span className="font-medium">💡 Tip:</span> {activity.tips}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
