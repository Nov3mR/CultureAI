'use client';

import { useState } from 'react';
import { translateText, Translation } from '@/lib/travelApi';
import { Compass, Globe, Languages, Sparkles, MapPin, Plane } from 'lucide-react';

export default function Translator() {
    const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Spanish');
    const [context, setContext] = useState('');
    const [translation, setTranslation] = useState<Translation | null>(null);
    const [loading, setLoading] = useState(false);

    const commonLanguages = [
        'Spanish', 'French', 'German', 'Italian', 'Portuguese',
        'Japanese', 'Korean', 'Mandarin Chinese', 'Arabic', 'Thai',
        'Vietnamese', 'Hindi', 'Turkish', 'Greek', 'Dutch'
    ];

    const contextOptions = [
        'ordering food at a restaurant',
        'asking for directions',
        'booking a hotel',
        'shopping',
        'emergency situation',
        'making friends',
        'transportation'
    ];

    const handleTranslate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const result = await translateText(text, targetLanguage, context);
            setTranslation(result);
        } catch (error) {
            console.error('Translation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
              <div className="p-8 text-center text-gray-600">
                <Languages className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-semibold mb-2 text-gray-600">Translator</h3>
                <p>Break language barriers with AI translation</p>
              </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-600">Travel Translator</h2>

            <form onSubmit={handleTranslate} className="space-y-4 mb-8 text-gray-600">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">
                        What do you want to say?
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to translate..."
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 min-h-[100px]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">
                        Translate to:
                    </label>
                    <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        {commonLanguages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">
                        Context (optional):
                    </label>
                    <select
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">General</option>
                        {contextOptions.map(ctx => (
                            <option key={ctx} value={ctx}>{ctx}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 
                    ${loading || !text.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02] active:scale-95'}`}
                    >
                    {loading ? (
                    '🔄 Translating...'
                    ) : !text.trim() ? (
                    <span className="text-gray-50">Enter text to translate</span>
                    ) : (
                    '🌐 Translate'
                    )}
                </button>
            </form>

            {/* Translation Result */}
            {translation && (
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <div className="border-b pb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Translation:</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {translation.translation}
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            📢 Pronunciation:
                        </h3>
                        <p className="text-lg text-gray-700 italic">
                            {translation.pronunciation}
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">
                            💡 Cultural Note:
                        </h3>
                        <p className="text-sm text-blue-900">{translation.cultural_note}</p>
                    </div>

                    <div className="text-sm">
                        <span className="font-medium">Formality:</span>{' '}
                        <span className="px-2 py-1 bg-gray-200 rounded-full">
                            {translation.formality}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}