import { useState, useEffect } from 'react';

const staticIssues = [
  {
    id: 1,
    title: 'Broken Street Light',
    category: 'electricity',
    location: '123 Main St',
    description: 'Street light has been out for 3 days, creating safety concerns at night.',
    status: 'pending',
    urgency: 'high',
    date: '2024-03-15',
    votes: 15,
    images: ['https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?q=80&w=500&auto=format&fit=crop']
  },
  {
    id: 2,
    title: 'Garbage Collection Needed',
    category: 'sanitation',
    location: 'Park Avenue',
    description: 'Overflowing garbage bins near the park entrance. Needs immediate attention.',
    status: 'in-progress',
    urgency: 'medium',
    date: '2024-03-14',
    votes: 8,
    images: ['https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=500&auto=format&fit=crop']
  },
  {
    id: 3,
    title: 'Water Leakage',
    category: 'water',
    location: 'Downtown Area',
    description: 'Major water leak from a broken pipe causing street flooding.',
    status: 'resolved',
    urgency: 'high',
    date: '2024-03-13',
    votes: 23,
    images: ['https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=500&auto=format&fit=crop']
  }
];

const PublicFeed = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null); 
      try {
        const res = await fetch('http://localhost:5000/api/issues');
        if (!res.ok) throw new Error('Failed to fetch issues');
        const data = await res.json();
        setIssues(data);
      } catch (err) {
        setError(err.message || 'Error fetching issues');
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort static issues
  const filteredStatic = staticIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? issue.category === categoryFilter : true;
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'votes') return b.votes - a.votes;
    if (sortBy === 'urgency') {
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    }
    return 0;
  });

  const filteredDynamic = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? issue.category === categoryFilter : true;
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'votes') return b.votes - a.votes;
    if (sortBy === 'urgency') {
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    }
    return 0;
  });

  const renderCard = (issue) => (
    <div key={issue._id || issue.id} className="card group">
      {issue.images && issue.images[0] && (
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          <img
            src={issue.images[0]}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(issue.urgency)}`}>
              {issue.urgency || 'normal'}
            </span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-black group-hover:text-primary transition-colors">
            {issue.title}
          </h3>
        </div>
        
        <p className="text-gray-600 leading-relaxed">{issue.description}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {issue.location}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(issue.status)}`}>
            {issue.status || 'pending'}
          </span>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="font-medium">{issue.votes || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-responsive-lg font-bold mb-4 text-black">
            Public Issue Feed
          </h1>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
            Stay informed about civic issues in your community. Track progress and support initiatives that matter to you.
          </p>
        </div>

        {/* Responsive Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Sidebar Filters */}
          <aside className="lg:w-7/24 w-full lg:sticky lg:top-24 self-start z-10">
            <div className="card p-6 h-full lg:min-h-[60vh] flex flex-col gap-6 shadow-medium">
              <h2 className="text-lg font-semibold mb-2 text-black">Filter Issues</h2>
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input mb-2"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-input"
                >
                  <option value="">All Categories</option>
                  <option value="electricity">Electricity</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="water">Water</option>
                  <option value="roads">Roads</option>
                  <option value="parks">Parks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-input"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input"
                >
                  <option value="date">Sort by Date</option>
                  <option value="votes">Sort by Votes</option>
                  <option value="urgency">Sort by Urgency</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Issues Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading issues...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...filteredStatic, ...filteredDynamic].map(renderCard)}
              </div>
            )}

            {!loading && !error && [...filteredStatic, ...filteredDynamic].length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No issues found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PublicFeed;