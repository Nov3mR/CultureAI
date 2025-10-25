"use client";

import React, { useState } from "react";
import {
  Compass,
  Globe,
  Languages,
  Sparkles,
  MapPin,
  Plane,
} from "lucide-react";
import ActivityRecommendations from "@/components/ActivityRecommendations";
import CountryRecommendations from "@/components/CountryRecommendations";
import Translator from "@/components/Translator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "activities" | "countries" | "translate"
  >("activities");
  const [userId] = useState("user123");

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url(/world-map.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob z-0"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-0"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header with enhanced design */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Plane className="w-12 h-12 text-indigo-600 transform -rotate-45" />
              <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-3">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CulturAI
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-lg text-slate-600 font-medium">
              Your AI-powered travel companion
            </p>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-2 inline-flex gap-2 border border-white/20">
            <button
              onClick={() => setActiveTab("activities")}
              className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "activities"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeTab === "activities"
                      ? "rotate-180"
                      : "group-hover:rotate-45"
                  }`}
                />
                Activities
              </span>
              {activeTab === "activities" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("countries")}
              className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "countries"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <Globe
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeTab === "countries"
                      ? "animate-spin-slow"
                      : "group-hover:rotate-12"
                  }`}
                />
                Destinations
              </span>
              {activeTab === "countries" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("translate")}
              className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "translate"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 scale-105"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <Languages
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeTab === "translate"
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
                />
                Translate
              </span>
              {activeTab === "translate" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Content Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Decorative top border */}
            <div
              className={`h-1.5 transition-all duration-500 ${
                activeTab === "activities"
                  ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                  : activeTab === "countries"
                  ? "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
                  : "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
              }`}
            ></div>

            {/* Content with smooth transitions */}
            <div className="min-h-[500px] transition-all duration-500">
              {activeTab === "activities" && (
                <div className="animate-fadeIn">
                  <ActivityRecommendations userId={userId} />
                </div>
              )}
              {activeTab === "countries" && (
                <div className="animate-fadeIn">
                  <CountryRecommendations userId={userId} />
                </div>
              )}
              {activeTab === "translate" && (
                <div className="animate-fadeIn">
                  <Translator />
                </div>
              )}
            </div>
          </div>

          {/* Bottom info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">AI-Powered</h3>
              <p className="text-sm text-slate-600">
                Smart recommendations tailored for you
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Global Coverage
              </h3>
              <p className="text-sm text-slate-600">
                Explore destinations worldwide
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                <Languages className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Real-time Translation
              </h3>
              <p className="text-sm text-slate-600">
                Break language barriers instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
