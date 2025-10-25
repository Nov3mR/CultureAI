// lib/travelApi.ts - API client for your Next.js app

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Activity {
    name: string;
    description: string;
    category: string;
    location: string;
    estimated_cost: string;
    best_time: string;
    tips: string;
}

export interface CountryRecommendation {
    country: string;
    reason: string;
    highlights: string[];
    best_for: string;
    estimated_budget: string;
    best_season: string;
    similar_to?: string;
}

export interface Translation {
    translation: string;
    pronunciation: string;
    cultural_note: string;
    formality: string;
}

export interface UserProfile {
    user_id: string;
    visited_countries: string[];
    preferences: Record<string, any>;
    travel_history: Array<{
        country: string;
        visit_date: string;
    }>;
}

// Activity Recommendations
export async function getActivityRecommendations(
    userId: string,
    country: string,
    interests: string[] = [],
    durationDays?: number
): Promise<Activity[]> {
    try {
        const response = await fetch(`${API_BASE}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                country: country,
                interests: interests,
                duration_days: durationDays,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.recommendations || [];
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
}

// Country Recommendations
export async function getCountryRecommendations(
    userId: string,
    budget?: string,
    travelStyle?: string
): Promise<CountryRecommendation[]> {
    try {
        const response = await fetch(`${API_BASE}/recommend-countries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                budget: budget,
                travel_style: travelStyle,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.recommendations || [];
    } catch (error) {
        console.error('Error fetching country recommendations:', error);
        throw error;
    }
}

// Translation
export async function translateText(
    text: string,
    targetLanguage: string,
    context?: string
): Promise<Translation> {
    try {
        const response = await fetch(`${API_BASE}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                target_language: targetLanguage,
                context: context,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
}

// User Profile Management
export async function getUserProfile(userId: string): Promise<UserProfile> {
    try {
        const response = await fetch(`${API_BASE}/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export async function updateUserProfile(
    userId: string,
    updates: {
        visited_countries?: string[];
        preferences?: Record<string, any>;
    }
): Promise<UserProfile> {
    try {
        const response = await fetch(`${API_BASE}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

export async function addVisitedCountry(
    userId: string,
    country: string,
    visitDate?: string
): Promise<{ visited_countries: string[] }> {
    try {
        const response = await fetch(
            `${API_BASE}/users/${userId}/visited?country=${encodeURIComponent(country)}${visitDate ? `&visit_date=${visitDate}` : ''
            }`,
            {
                method: 'POST',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding visited country:', error);
        throw error;
    }
}