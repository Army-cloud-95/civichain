import { Link } from 'react-router-dom';
import HomeHero from '../components/home/HomeHero';

const Home = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F5FA' }}>

      <HomeHero />

      {/* Hero Section */}
      {/* <div className="relative flex items-center w-full" style={{overflow: 'hidden', margin: 0, padding: 0}}>
        <div className="absolute inset-0 w-full h-full z-0" style={{margin: 0, padding: 0}}>
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
            alt="City landscape"
            className="w-full h-full object-cover"
            style={{ display: 'block', margin: 0, padding: 0, borderRadius: 0 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(33, 33, 33, 0.4)' }}></div>
        </div>
        <div className="relative z-10 w-full flex items-center py-48">
          <div className="max-w-4xl w-full px-8 text-left ml-0 md:ml-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span style={{ color: '#F6F5FA' }}>
                Empowering Cities
              </span>
              <br />
              <span style={{ color: '#EFF0A3' }}>
                Through Technology
              </span>
            </h1>
            <p className="text-xl mb-12 max-w-2xl" style={{ color: '#F6F5FA' }}>
              Join thousands of citizens making their communities better through blockchain-powered civic engagement.
            </p>
            <div className="flex flex-wrap gap-6">
              <a 
                href="/report" 
                className="px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
                style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#CFDECA'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#EFF0A3'}
              >
                Start Reporting Issues
              </a>
              <button 
                className="px-8 py-4 rounded-xl font-semibold transition-all border"
                style={{ backgroundColor: 'transparent', color: '#F6F5FA', borderColor: '#DBDFE9' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#DBDFE9'; e.target.style.color = '#212121'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#F6F5FA'; }}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Stats Section */}
      <div className="py-24" style={{ backgroundColor: '#DBE7F0' }}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#212121' }}>
                50K+
              </div>
              <p style={{ color: '#212121', opacity: '0.7' }}>Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#212121' }}>
                100+
              </div>
              <p style={{ color: '#212121', opacity: '0.7' }}>Cities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#212121' }}>
                25K+
              </div>
              <p style={{ color: '#212121', opacity: '0.7' }}>Issues Resolved</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#212121' }}>
                98%
              </div>
              <p style={{ color: '#212121', opacity: '0.7' }}>Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24" style={{ backgroundColor: '#F6F5FA' }}>
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#212121' }}>
            Why Choose CiviChain?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div 
              className="rounded-2xl p-8 transition-all hover:scale-105"
              style={{ backgroundColor: '#DBDFE9' }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#EFF0A3' }}
              >
                <svg className="w-8 h-8" style={{ color: '#212121' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#212121' }}>Blockchain Security</h3>
              <p style={{ color: '#212121', opacity: '0.8' }}>
                Every issue reported is securely stored on the blockchain, ensuring transparency and immutability. Track the status of your reports in real-time.
              </p>
            </div>
            <div 
              className="rounded-2xl p-8 transition-all hover:scale-105"
              style={{ backgroundColor: '#CFDECA' }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#EFF0A3' }}
              >
                <svg className="w-8 h-8" style={{ color: '#212121' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#212121' }}>AI-Powered Triage</h3>
              <p style={{ color: '#212121', opacity: '0.8' }}>
                Our AI system automatically categorizes and prioritizes issues, ensuring faster response times and more efficient resource allocation.
              </p>
            </div>
            <div 
              className="rounded-2xl p-8 transition-all hover:scale-105"
              style={{ backgroundColor: '#DBDFE9' }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#EFF0A3' }}
              >
                <svg className="w-8 h-8" style={{ color: '#212121' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#212121' }}>Community Driven</h3>
              <p style={{ color: '#212121', opacity: '0.8' }}>
                Connect with other citizens, follow issues that matter to you, and collaborate with local authorities for better solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 rounded-3xl overflow-hidden mx-8 mb-8">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"
            alt="Community collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(33, 33, 33, 0.6)' }}></div>
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#F6F5FA' }}>
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-12" style={{ color: '#F6F5FA', opacity: '0.9' }}>
              Join thousands of active citizens who are already making their communities better through CiviChain.
            </p>
            <a 
              href="/report" 
              className="px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
              style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#CFDECA'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#EFF0A3'}
            >
              Start Reporting Issues
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6" style={{ backgroundColor: '#DBE7F0', borderTop: '1px solid #CFDECA' }}>
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#212121', opacity: '0.7' }}>© 2024 CiviChain. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="text-sm transition-colors" style={{ color: '#212121', opacity: '0.7' }} onMouseEnter={(e) => e.target.style.color = '#212121'} onMouseLeave={(e) => e.target.style.opacity = '0.7'}>Privacy</a>
              <a href="#" className="text-sm transition-colors" style={{ color: '#212121', opacity: '0.7' }} onMouseEnter={(e) => e.target.style.color = '#212121'} onMouseLeave={(e) => e.target.style.opacity = '0.7'}>Terms</a>
              <a href="#" className="text-sm transition-colors" style={{ color: '#212121', opacity: '0.7' }} onMouseEnter={(e) => e.target.style.color = '#212121'} onMouseLeave={(e) => e.target.style.opacity = '0.7'}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;