import React from "react";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-responsive-xl font-bold text-black leading-tight">
                Make Your City Better,{" "}
                <span className="gradient-text">One Report at a Time</span>
              </h1>
              <p className="text-responsive-md text-gray-600 leading-relaxed max-w-2xl">
                Spotted a pothole? Broken streetlight? Help improve your community
                by reporting issues directly to your local municipality through our
                blockchain-powered platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report" className="btn-primary text-center">
                Report an Issue →
              </Link>
              <Link to="/feed" className="btn-secondary">
                View Listed Issues
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600">50K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600">100+ Cities</span>
              </div>
            </div>
          </div>

          <div className="relative slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20"></div>
                <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Smart Civic Platform</h3>
                    <p className="text-gray-600">AI-powered issue tracking with blockchain verification</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">AI Analysis</p>
                        <p className="text-sm text-gray-600">Smart categorization</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Blockchain Secure</p>
                        <p className="text-sm text-gray-600">Immutable records</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Community Driven</p>
                        <p className="text-sm text-gray-600">Citizen collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
