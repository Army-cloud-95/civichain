import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#F6F5FA' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ minHeight: '420px', background: 'linear-gradient(135deg, #DBDFE9 0%, #CFDECA 100%)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(219, 223, 233, 0.9), rgba(207, 222, 202, 0.85))' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-8 py-24 flex flex-col justify-center h-full">
          <div className="bg-light/95 rounded-3xl shadow-2xl p-12 text-left backdrop-blur-sm border border-light/20 transform hover:scale-[1.02] transition-all duration-300" style={{ background: '#F6F5FA', borderColor: '#DBDFE9' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-dark to-dark bg-clip-text text-transparent">
              About CiviChain
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: '#212121' }}>
              CiviChain is building a future where every citizen's voice matters, and every civic issue gets the attention it deserves.
            </p>
            <p className="text-base md:text-lg" style={{ color: '#212121', opacity: 0.8 }}>
              Through the power of blockchain and AI, we're making local governance more transparent, efficient, and accountable.
            </p>
            <div className="mt-6 h-1 rounded-full w-24" style={{ background: 'linear-gradient(90deg, #DBDFE9 0%, #CFDECA 100%)' }}></div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <div 
              className="p-8 rounded-3xl shadow-xl border border-light/30 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #DBDFE9 0%, #CFDECA 100%)', borderColor: '#DBDFE9' }}
            > 
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-dark to-dark bg-clip-text text-transparent">Our Mission</h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#212121' }}>
                <p>
                  CiviChain is dedicated to revolutionizing how citizens interact with their local government. 
                  We believe in the power of technology to create transparency, accountability, and efficient 
                  problem-solving in civic matters.
                </p>
                <p>
                  By combining blockchain technology with artificial intelligence, 
                  we're building a platform that ensures every citizen's voice is heard and every issue is addressed.
                </p>
                <div className="mt-8 pt-6 border-t border-light/30" style={{ borderColor: '#DBDFE9' }}>
                  <p className="font-semibold italic text-dark text-xl" style={{ color: '#212121' }}>
                    "Empowering communities through transparent and efficient civic engagement."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { emoji: '🎯', title: 'Vision', desc: 'Empowering communities through transparent governance', bg: '#CFDECA' },
              { emoji: '💡', title: 'Innovation', desc: 'Leveraging cutting-edge technology for civic improvement', bg: '#DBDFE9' },
              { emoji: '🤝', title: 'Community', desc: 'Building stronger neighborhoods together', bg: '#CFDECA' },
              { emoji: '⚖️', title: 'Trust', desc: 'Ensuring accountability through blockchain', bg: '#DBDFE9' }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-light/20"
                style={{ backgroundColor: item.bg, borderColor: '#DBDFE9' }}
              >
                <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212121' }}>{item.title}</h3>
                <p style={{ color: '#212121', opacity: 0.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24" style={{ background: 'linear-gradient(135deg, #DBDFE9 0%, #CFDECA 100%)' }}>
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-dark to-dark bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', desc: '10+ years experience in civic tech', image: 'photo-1438761681033-6461ffad8d80' },
              { name: 'Michael Chen', role: 'CTO', desc: 'Expert in AI and blockchain', image: 'photo-1472099645785-5658abf4ff4e' },
              { name: 'Emily Rodriguez', role: 'Head of Community', desc: 'Community relations expert', image: 'photo-1517841905240-472988babdf9' },
              { name: 'Alex Thompson', role: 'Lead Developer', desc: 'Full-stack blockchain dev', image: 'photo-1500648767791-00dcc994a43e' },
              { name: 'Lisa Wang', role: 'Product Manager', desc: 'UX and strategy expert', image: 'photo-1573497019940-1c28c88b4f3e' }
            ].map((member, index) => (
              <div 
                key={index}
                className="rounded-3xl p-8 text-center group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-light/30 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(246, 245, 250, 0.9)', borderColor: '#DBDFE9' }}
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    src={`https://images.unsplash.com/${member.image}?q=80&w=200&h=200&auto=format&fit=crop`}
                    alt="Team member"
                    className="rounded-full w-full h-full object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-light group-hover:scale-110"
                    style={{ borderColor: '#DBDFE9' }}
                  />
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, #DBDFE9 0%, #CFDECA 100%)', opacity: 0.2 }}></div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212121' }}>{member.name}</h3>
                <p className="mb-4 font-medium" style={{ color: '#EFF0A3' }}>{member.role}</p>
                <p style={{ color: '#212121', opacity: 0.8 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-dark to-dark bg-clip-text text-transparent">
          What People Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-light/20"
            style={{ background: 'linear-gradient(135deg, #DBDFE9 0%, #CFDECA 100%)', borderColor: '#DBDFE9' }}
          >
            <svg 
              className="w-12 h-12 mb-6" 
              fill="#EFF0A3" 
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-lg mb-6" style={{ color: '#212121', opacity: 0.8 }}>
              "CiviChain has transformed how we handle resident complaints. The transparency and efficiency
              brought by blockchain technology have significantly improved our response times."
            </p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
                alt="Testimonial author"
                className="w-14 h-14 rounded-full mr-4 shadow-lg border-2 border-light"
                style={{ borderColor: '#DBDFE9' }}
              />
              <div>
                <h4 className="font-semibold" style={{ color: '#212121' }}>David Martinez</h4>
                <p style={{ color: '#212121', opacity: 0.7 }}>City Council Member</p>
              </div>
            </div>
          </div>
          <div 
            className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-light/20"
            style={{ background: 'linear-gradient(135deg, #CFDECA 0%, #DBDFE9 100%)', borderColor: '#DBDFE9' }}
          >
            <svg 
              className="w-12 h-12 mb-6" 
              fill="#EFF0A3" 
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-lg mb-6" style={{ color: '#212121', opacity: 0.8 }}>
              "As a community organizer, I've seen firsthand how CiviChain empowers citizens to take
              action. The AI-powered verification system ensures that real issues get priority attention."
            </p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                alt="Testimonial author"
                className="w-14 h-14 rounded-full mr-4 shadow-lg border-2 border-light"
                style={{ borderColor: '#DBDFE9' }}
              />
              <div>
                <h4 className="font-semibold" style={{ color: '#212121' }}>Rachel Kim</h4>
                <p style={{ color: '#212121', opacity: 0.7 }}>Community Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 mt-16 shadow-2xl" style={{ backgroundColor: '#212121', borderTop: '3px solid #EFF0A3' }}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #DBDFE9 0%, #CFDECA 100%)' }}>
              <span className="font-bold" style={{ color: '#212121' }}>C</span>
            </div>
            <span className="text-xl font-semibold" style={{ color: '#EFF0A3' }}>CiviChain</span>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-sm transition-all duration-300 font-medium"
                style={{ color: '#F6F5FA' }}
                onMouseEnter={e => e.target.style.color = '#EFF0A3'}
                onMouseLeave={e => e.target.style.color = '#F6F5FA'}
              >
                {link}
              </a>
            ))}
          </div>
          <span className="text-xs mt-2 md:mt-0" style={{ color: '#DBDFE9' }}>© 2024 CiviChain. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default About;