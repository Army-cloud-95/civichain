import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// const staticIssues = [
//   {
//     id: 1,
//     title: 'Broken Street Light',
//     category: 'electricity',
//     location: '123 Main St',
//     description: 'Street light has been out for 3 days, creating safety concerns at night.',
//     status: 'pending',
//     urgency: 'high',
//     date: '2024-03-15',
//     votes: 15,
//     images: ['https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?q=80&w=500&auto=format&fit=crop']
//   },
//   {
//     id: 2,
//     title: 'Garbage Collection Needed',
//     category: 'sanitation',
//     location: 'Park Avenue',
//     description: 'Overflowing garbage bins near the park entrance. Needs immediate attention.',
//     status: 'in-progress',
//     urgency: 'medium',
//     date: '2024-03-14',
//     votes: 8,
//     images: ['https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=500&auto=format&fit=crop']
//   },
//   {
//     id: 3,
//     title: 'Water Leakage',
//     category: 'water',
//     location: 'Downtown Area',
//     description: 'Major water leak from a broken pipe causing street flooding.',
//     status: 'resolved',
//     urgency: 'high',
//     date: '2024-03-13',
//     votes: 23,
//     images: ['https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=500&auto=format&fit=crop']
//   }
// ];

const PublicFeed = () => {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [locationFilter, setLocationFilter] = useState("");
    const [coords, setCoords] = useState(null); // { lat, lon }
    // const [geoPermission, setGeoPermission] = useState("");
    const [city, setCity] = useState("");

    const locationHook = useLocation();

    // Read query params on mount / when URL changes
    useEffect(() => {
        const params = new URLSearchParams(locationHook.search);
        const q = params.get("q") || "";
        const loc = params.get("loc") || "";
        if (q) setSearchTerm(q);
        if (loc) setLocationFilter(loc);
    }, [locationHook.search]);

    const token = localStorage.getItem("accessToken"); // or from your auth context

    // Add token validation
    useEffect(() => {
        if (!token) {
            // Redirect to login or show unauthorized message
            navigate("/login");
            return;
        }
    }, [token, navigate]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    setCoords({ lat, lon });

                    // Get city name for location filter
                    try {
                        const res = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
                        );
                        const data = await res.json();
                        const cityName =
                            data?.city || data?.locality || data?.state || "";
                        setLocationFilter(cityName);
                    } catch (err) {
                        console.error("Error fetching city:", err);
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    }, []);

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    search: searchTerm,
                    location: locationFilter,
                    sortBy: sortBy === "date" ? "createdAt" : sortBy,
                    order: "desc",
                });
                // if(coords){
                //     params.append("latitude",coords.lat.toString());
                //     params.append("longitude",coords.lon.toString());
                // }
                const res = await fetch(
                    `http://localhost:8000/citizen/issues/?${params.toString()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                if (!res.ok) throw new Error("Failed to fetch issues");
                const data = await res.json();
                setIssues(data.issues || []);
            } catch (err) {
                setError(err.message || "Error fetching issues");
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, [searchTerm, locationFilter, categoryFilter, statusFilter]);

    // useEffect(() => {
    //     let cancelled = false;
    //     if (navigator.permissions && navigator.permissions.query) {
    //         navigator.permissions
    //             .query({ name: "geolocation" })
    //             .then((res) => {
    //                 if (!cancelled) setGeoPermission(res.state);
    //                 res.onchange = () =>
    //                     !cancelled && setGeoPermission(res.state);
    //             })
    //             .catch(() => {
    //                 /* ignore */
    //             });
    //     } else {
    //         setGeoPermission("unsupported");
    //     }
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(async (pos) => {
    //             if (!cancelled) {
    //                 const lat = pos.coords.latitude;
    //                 const lng = pos.coords.longitude;

    //                 // try {
    //                 //     const res = await fetch(
    //                 //         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    //                 //     )// ).then(res => res.json())
    //                 //         .then((data) =>
    //                 //             setLocationFilter(
    //                 //                 data?.city ||
    //                 //                     data?.locality ||
    //                 //                     data?.state ||
    //                 //                     data?.village ||
    //                 //                     "Ghaziabad"
    //                 //             )
    //                 //         )
    //                 //         .catch((err) =>
    //                 //             console.error("Error fetching city:", err)
    //                 //         );
    //                 //     const data = await res.json();

    //                 //     // Nominatim gives you detailed address components
    //                 //     // const city1 =
    //                 //     //   data.city ||
    //                 //     //   data.locality ||
    //                 //     //   data.village ||
    //                 //     //   data.state ||
    //                 //     //   "Unknown";

    //                 //     // setLocationFilter(city1);
    //                 // } catch (err) {
    //                 //     console.error("Error fetching city:", err);
    //                 // }

    //             }
    //         });
    //     }

    //     return () => {
    //         cancelled = true;
    //     };
    // }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "in-progress":
                return "bg-blue-100 text-blue-800";
            case "resolved":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-orange-100 text-orange-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Filter and sort static issues
    // const filteredStatic = staticIssues.filter(issue => {
    //   const matchesSearch = searchTerm
    //     ? (issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //       issue.description.toLowerCase().includes(searchTerm.toLowerCase()))
    //     : true;
    //   const matchesLocation = locationFilter
    //     ? issue.location.toLowerCase().includes(locationFilter.toLowerCase())
    //     : true;
    //   const matchesCategory = categoryFilter ? issue.category === categoryFilter : true;
    //   const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    //   return matchesSearch && matchesLocation && matchesCategory && matchesStatus;
    // }).sort((a, b) => {
    //   if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    //   if (sortBy === 'votes') return b.votes - a.votes;
    //   if (sortBy === 'urgency') {
    //     const urgencyOrder = { high: 3, medium: 2, low: 1 };
    //     return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    //   }
    //   return 0;
    // });

    // const filteredDynamic = issues
    //     .filter((issue) => {
    //         const matchesSearch = searchTerm
    //             ? issue.title?.toLowerCase()
    //                   .includes(searchTerm.toLowerCase()) ||
    //               issue.description?.toLowerCase().includes(searchTerm.toLowerCase())
    //             : true;
    //         const matchesLocation = locationFilter
    //             ? (issue.location || "")
    //                   .toLowerCase()
    //                   .includes(locationFilter.toLowerCase())
    //             : true;
    //         const matchesCategory = categoryFilter
    //             ? issue.category === categoryFilter
    //             : true;
    //         const matchesStatus = statusFilter
    //             ? issue.status === statusFilter
    //             : true;
    //         return (
    //             matchesSearch &&
    //             matchesLocation &&
    //             matchesCategory &&
    //             matchesStatus
    //         );
    //     })
    //     .sort((a, b) => {
    //         if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    //         if (sortBy === "votes") return b.votes - a.votes;
    //         if (sortBy === "urgency") {
    //             const urgencyOrder = { high: 3, medium: 2, low: 1 };
    //             return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    //         }
    //         return 0;
    //     });

    const renderCard = (issue) => {
        let displayLocation = "Location not specified";

        if (issue.address?.fullAddress) {
            displayLocation = issue.address.fullAddress;
        } else if (issue.address?.district || issue.address?.state) {
            const parts = [
                issue.address?.district,
                issue.address?.state,
            ].filter(Boolean);
            displayLocation = parts.join(", ");
        }
        return (
            <div
                key={issue._id || issue.id}
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
                                {issue.title}
                            </h3>
                            <p className="text-xs text-gray-500 uppercase">
                                {issue.tags?.join(" ,")}
                            </p>
                        </div>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                        {issue.priority || "normal"}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    {issue.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>🔺{displayLocation}</span>
                    <span>⏰{issue.createdAt.split("T")[0]}</span>
                    <span>👥 {issue.vote || 1}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-responsive-lg font-bold mb-4 text-black">
                        Public Issue Feed
                    </h1>
                    <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
                        Stay informed about civic issues in your community.
                        Track progress and support initiatives that matter to
                        you.
                    </p>
                </div>

                {/* Responsive Layout: Sidebar + Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sticky Sidebar Filters */}
                    <aside className="lg:w-7/24 w-full lg:sticky lg:top-24 self-start z-10">
                        <div className="card p-6 h-full lg:min-h-[60vh] flex flex-col gap-6 shadow-medium">
                            <h2 className="text-lg font-semibold mb-2 text-black">
                                Filter Issues
                            </h2>
                            <input
                                type="text"
                                placeholder="Search issues..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Filter by location..."
                                value={locationFilter}
                                onChange={(e) =>
                                    setLocationFilter(e.target.value)
                                }
                                className="form-input mb-2"
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                    className="form-input"
                                >
                                    <option value="">All Categories</option>
                                    <option value="electricity">
                                        Electricity
                                    </option>
                                    <option value="sanitation">
                                        Sanitation
                                    </option>
                                    <option value="water">Water</option>
                                    <option value="roads">Roads</option>
                                    <option value="parks">Parks</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="form-input"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">
                                        In Progress
                                    </option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="form-input"
                                >
                                    <option value="date">Sort by Date</option>
                                    <option value="votes">Sort by Votes</option>
                                    <option value="urgency">
                                        Sort by Urgency
                                    </option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Issues Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-4 text-gray-600">
                                    Loading issues...
                                </p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                                {issues.map(renderCard)}
                            </div>
                        )}

                        {!loading && !error && issues.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">
                                    No issues found matching your criteria.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PublicFeed;
