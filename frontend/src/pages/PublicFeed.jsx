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
        return '#FFFA03';
      case 'in-progress':
        return '#DBE7F0';
      case 'resolved':
        return '#CFDECA';
      default:
        return '#F6F5FA';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return '#FFFA03';
      case 'medium':
        return '#DBE7F0';
      case 'low':
        return '#CFDECA';
      default:
        return '#F6F5FA';
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

  // Filter and sort dynamic issues
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
    <div 
      key={issue._id || issue.id} 
      className="rounded-2xl overflow-hidden transition-all transform hover:-translate-y-1"
      style={{ backgroundColor: '#F6F5FA', border: '1px solid #DBE7F0' }}
    >
      {issue.images && issue.images[0] && (
        <div className="relative h-48">
          <img
            src={issue.images[0]}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold" style={{ color: '#212121' }}>{issue.title}</h3>
          <span 
            className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: getUrgencyColor(issue.urgency), color: '#212121' }}
          >
            {issue.urgency || 'normal'}
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: '#212121', opacity: '0.8' }}>{issue.description}</p>
        <div className="flex items-center text-sm mb-4" style={{ color: '#212121', opacity: '0.7' }}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {issue.location}
        </div>
        <div className="flex justify-between items-center">
          <span 
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: getStatusColor(issue.status), color: '#212121' }}
          >
            {issue.status || 'pending'}
          </span>
          <div className="flex items-center">
            <button 
              className="flex items-center p-2 rounded-xl transition-all"
              style={{ color: '#212121', backgroundColor: '#DBE7F0' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#CFDECA'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#DBE7F0'}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {issue.votes || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#F6F5FA' }}>
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#212121' }}>
          Public Issue Feed
        </h1>

        {/* Filter Section */}
        <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: '#DBDFE9' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search issues..."
              className="rounded-xl px-4 py-2 focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#F6F5FA', 
                border: '2px solid #DBDFE9',
                color: '#212121'
              }}
              onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
              onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="rounded-xl px-4 py-2 focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#F6F5FA', 
                border: '2px solid #DBDFE9',
                color: '#212121'
              }}
              onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
              onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="sanitation">Sanitation</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="roads">Roads</option>
            </select>
            <select 
              className="rounded-xl px-4 py-2 focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#F6F5FA', 
                border: '2px solid #DBDFE9',
                color: '#212121'
              }}
              onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
              onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select 
              className="rounded-xl px-4 py-2 focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#F6F5FA', 
                border: '2px solid #DBDFE9',
                color: '#212121'
              }}
              onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
              onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort By Date</option>
              <option value="votes">Sort By Votes</option>
              <option value="urgency">Sort By Urgency</option>
            </select>
          </div>
        </div>

        {/* Static Cards */}
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#212121' }}>Featured Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStatic.map(renderCard)}
        </div>

        {/* Dynamic Cards */}
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#212121' }}>Latest Community Reports</h2>
        {loading && (
          <div className="text-center py-12" style={{ color: '#212121' }}>Loading issues...</div>
        )}
        {error && (
          <div className="text-center py-12" style={{ color: '#212121' }}>{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && !error && filteredDynamic.map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default PublicFeed;