import { Link } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <HomeHero />

            {/* Stats Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                50,324
                            </div>
                            <p className="text-sm text-gray-600">
                                Active Issues
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                50K+
                            </div>
                            <p className="text-sm text-gray-600">Citizens</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                7,532
                            </div>
                            <p className="text-sm text-gray-600">
                                Resolved Today
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7h2l1 10a2 2 0 002 2h8a2 2 0 002-2l1-10h2M5 7h14M10 11v6m4-6v6"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                1,245
                            </div>
                            <p className="text-sm text-gray-600">
                                Departments Engaged
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories Section */}
            <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-150">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Popular Categories
                        </h2>
                        <Link
                            to="/feed"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
                            <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">
                                Water & Sanitation
                            </h3>
                            <p className="text-base text-gray-500">
                                18,250 issues
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
                            <div className="w-20 h-20 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-violet-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">
                                Road/Infrastructure
                            </h3>
                            <p className="text-base text-gray-500">
                                25,430 issues
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
                            <div className="w-20 h-20 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">
                                Street Lighting
                            </h3>
                            <p className="text-base text-gray-500">
                                12,890 issues
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
                            <div className="w-20 h-20 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">
                                Waste Management
                            </h3>
                            <p className="text-base text-gray-500">
                                15,670 issues
                            </p>
                        </div>

                        {/* Removed 6th card for 5 total, increased size of each */}
                    </div>
                </div>
            </section>

            {/* Featured Issues Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Featured Issues
                        </h2>
                        <Link
                            to="/feed"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                Pothole on Main Street
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Road & Infrastructure
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                                        High Priority
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Large pothole causing traffic issues on Main
                                    Street near the shopping center...
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>📍 Downtown Area</span>
                                    <span>⏰ 2 hours ago</span>
                                    <span>👥 15 reports</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How CiviChain Works Section */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How CiviChain Works
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            A simple, transparent flow to participate – styled
                            cleanly in blue & white.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative flex flex-col md:flex-row md:items-stretch md:justify-between gap-12 md:gap-16 pt-6">
                        {[
                            {
                                title: "Report Issues",
                                desc: "Citizens submit problems with location and media through a simple portal.",
                                icon: (
                                    // Heroicons: Clipboard Document
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: "AI Categorization",
                                desc: "Machine learning tags and routes issues to the correct departments.",
                                icon: (
                                    // Heroicons: Adjustments Horizontal
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 3v2m6-2v2m0 14v2m-6-2v2m-4-8H3m2-6H3m2 12H3m16-12h2m-2 6h2m-2 6h2M7 7h10v10H7V7z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: "Blockchain Voting",
                                desc: "Secure, tamper-proof voting prioritizes community concerns.",
                                icon: (
                                    // Heroicons: Key (symbolizing security)
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5 2c0 5.25-4 9.75-9 9.75S3 17.25 3 12V5.25L12 3l9 2.25V12z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: "Track Progress",
                                desc: "Real-time dashboards show updates and ensure official accountability.",
                                icon: (
                                    // Heroicons: Chart Bar
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3v18h18M9 17v-6m4 6v-4m4 4v-8"
                                        />
                                    </svg>
                                ),
                            },
                        ].map((step, i, arr) => (
                            <div
                                key={i}
                                className="relative flex-1 flex flex-col items-center text-center md:px-2"
                            >
                                {/* Arrow to next (behind cards) */}
                                {i < arr.length - 1 && i % 2 === 0 && (
                                    <div className="hidden md:block absolute -top-10 right-0 translate-x-1/2 -translate-y-1/2 w-40 lg:w-48 h-40 pointer-events-none z-0">
                                        <svg
                                            viewBox="0 0 200 160"
                                            className="w-full h-full"
                                            fill="none"
                                        >
                                            <path
                                                d="M0 120 C60 50 140 50 200 120"
                                                stroke="#60A5FA"
                                                strokeWidth="3"
                                                strokeDasharray="8 8"
                                                strokeLinecap="round"
                                            />
                                            {/* <path
                        d="M170 110 L200 120 L200 90"
                        stroke="#60A5FA"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        fill="none"
                      /> */}
                                        </svg>
                                    </div>
                                )}
                                {i < arr.length - 1 && i === 1 && (
                                    <div className="hidden md:block absolute top-40 right-0 translate-x-1/2 -translate-y-1/2 w-40 lg:w-48 h-40 pointer-events-none z-0 rotate-180">
                                        <svg
                                            viewBox="0 0 200 160"
                                            className="w-full h-full"
                                            fill="none"
                                        >
                                            <path
                                                d="M0 120 C60 50 140 50 200 120"
                                                stroke="#60A5FA"
                                                strokeWidth="3"
                                                strokeDasharray="8 8"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M170 110 L200 120 L200 90"
                                                stroke="#60A5FA"
                                                strokeWidth="3"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <div className="relative z-10 w-full bg-white shadow-xl ring-1 ring-blue-100 rounded-xl px-8 py-10 flex flex-col h-full min-h-[280px]">
                                    <div className="mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-600 text-white w-16 h-16 shadow-sm flex-shrink-0">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-semibold mb-3 text-gray-900 text-lg flex-grow-0">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mt-auto">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ready to Make a Change Section */}
            <section className="py-24 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to bring change to your community?
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Join CiviChain today and start reporting issues,
                        engaging with your neighbors, and making a real impact
                        in your area.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-10 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Report an Issue
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-sm">
                                    See something that needs fixing? Submit
                                    detailed civic issues with photos and
                                    location to alert the community.
                                </p>
                            </div>
                            <Link
                                to="/report"
                                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                            >
                                Report Now →
                            </Link>
                            <div className="absolute right-0 bottom-0 opacity-10 text-[180px] leading-none select-none pointer-events-none font-bold pr-4">
                                !
                            </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-10 flex flex-col justify-between text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Explore Community Feed
                                </h3>
                                <p className="text-blue-100 mb-6 max-w-sm">
                                    Discover, upvote and follow issues that
                                    matter most to your area. Help drive
                                    priority with collective visibility.
                                </p>
                            </div>
                            <Link
                                to="/feed"
                                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
                            >
                                Browse Feed →
                            </Link>
                            <div className="absolute right-0 -bottom-8 opacity-20 text-[150px] leading-none select-none pointer-events-none font-bold pr-4">
                                ∞
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <Link
                                to="/"
                                className="flex items-center gap-3 text-xl font-bold mb-4"
                            >
                                <span className="text-blue-400">CiviChain</span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Making communities better through
                                blockchain-powered civic engagement and
                                transparent issue reporting.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-white transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/report"
                                        className="hover:text-white transition-colors"
                                    >
                                        Report Issue
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/feed"
                                        className="hover:text-white transition-colors"
                                    >
                                        Browse Issues
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Categories</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Road Issues
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Water & Sanitation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Street Lighting
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Waste Management
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Community Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Report Abuse
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
                        <span className="text-sm text-gray-400">
                            © 2024 CiviChain. All rights reserved.
                        </span>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
