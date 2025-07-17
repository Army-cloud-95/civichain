import { Link } from 'react-router-dom';
import HomeHero from '../components/home/HomeHero';
import logo from '../assets/logoooo.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-black mb-4">
              Trusted by Communities Worldwide
            </h2>
            <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
              Join thousands of citizens making their communities better through blockchain-powered civic engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-soft">
              <div className="text-4xl font-bold mb-2 gradient-text">50K+</div>
              <p className="text-gray-700 font-medium">Active Users</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-soft">
              <div className="text-4xl font-bold mb-2 gradient-text">100+</div>
              <p className="text-gray-700 font-medium">Cities</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-soft">
              <div className="text-4xl font-bold mb-2 gradient-text">25K+</div>
              <p className="text-gray-700 font-medium">Issues Resolved</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-soft">
              <div className="text-4xl font-bold mb-2 gradient-text">98%</div>
              <p className="text-gray-700 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-black mb-4">
              Why Choose CiviChain?
            </h2>
            <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with community-driven solutions to create lasting change.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-soft group hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Blockchain Security</h3>
              <p className="text-gray-700 leading-relaxed">
                Every issue reported is securely stored on the blockchain, ensuring transparency and immutability. Track the status of your reports in real-time.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 shadow-soft group hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI-Powered Triage</h3>
              <p className="text-gray-700 leading-relaxed">
                Our AI system automatically categorizes and prioritizes issues, ensuring faster response times and more efficient resource allocation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-soft group hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Community Driven</h3>
              <p className="text-gray-700 leading-relaxed">
                Connect with other citizens, follow issues that matter to you, and collaborate with local authorities for better solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* CTA Section */}
            <div className="py-20 relative overflow-hidden">
              <div className="w-4/5 mx-auto rounded-3xl overflow-hidden relative flex items-center justify-center" style={{ minHeight: '280px' }}>
                <img
                  src="https://www.shutterstock.com/image-photo/team-building-volunteer-charity-group-600nw-2558547161.jpg"
                  alt="Community collaboration"
                  className="w-full h-full object-cover absolute inset-0" 
                  style={{ zIndex: 1, filter: 'blur(1.5px)' }}
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(33, 33, 33, 0.6)', zIndex: 2 }}></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 text-center">
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
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-black hover:opacity-80 transition-opacity mb-4 md:mb-0">
              <span className="gradient-text">CiviChain</span>
            </Link>
            <div className="flex items-center gap-8">
              <span className="text-sm text-gray-600">© 2024 CiviChain. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms</a>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;