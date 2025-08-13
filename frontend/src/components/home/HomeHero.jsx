import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: Add your image file (e.g., hero.png) to src/assets and adjust the filename below if different
import heroImage from "../../assets/hero.png"; // Place hero.png in src/assets/

const HomeHero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Build query string with existing values if present
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (locationTerm.trim()) params.set('loc', locationTerm.trim());
    navigate(`/feed${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <section className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="space-y-6 pr-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Find civic issues that need{" "}
                <span className="text-blue-600">your attention & action.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                Help improve your community by reporting and tracking civic issues. 
                Join thousands of active citizens making a difference through our blockchain-powered platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start w-full">
              <div className="flex-1 max-w-60">
                <div className="relative group w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-5 py-4 pl-14 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                  />
                  <svg className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
        <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Location"
                  value={locationTerm}
                  onChange={(e)=>setLocationTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
          className="w-full px-5 py-4 pl-12 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3.5 rounded-lg font-semibold shadow-sm transition-colors whitespace-nowrap sm:ml-1 lg:ml-3 text-base"
              >
                Find Issues
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-medium">Suggestions:</span> 
              <span className="ml-2">
                <button onClick={()=>setSearchTerm('Road Issues')} className="text-blue-600 hover:underline mr-3">Road Issues</button>
                <button onClick={()=>setSearchTerm('Street Lighting')} className="text-blue-600 hover:underline mr-3">Street Lighting</button>
                <button onClick={()=>setSearchTerm('Water Supply')} className="text-blue-600 hover:underline mr-3">Water Supply</button>
                <button onClick={()=>setSearchTerm('Waste Management')} className="text-blue-600 hover:underline mr-3">Waste Management</button>
                <button onClick={()=>setSearchTerm('Public Transport')} className="text-blue-600 hover:underline">Public Transport</button>
              </span>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end pr-2 lg:pr-8">
            <img
              src={heroImage}
              alt="CiviChain platform preview"
              className="w-[92%] md:w-[88%] lg:w-[82%] xl:w-[78%] rounded-2xl object-contain translate-x-2 lg:translate-x-6"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;