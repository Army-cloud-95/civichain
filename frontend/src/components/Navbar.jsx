import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed px-8 z-20 bg-white w-full">
      <nav className="max-w-7xl mx-auto p-4 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold min-w-fit text-dark"
          >
            <img src={logo} alt="CiviChain Logo" className="h-8 w-auto" />
            <span>CiviChain</span>
          </Link>
          <div className="flex gap-1 items-center">
            <Link className="px-3 py-2 hover:bg-slate-200 rounded-lg" to="/issues">View Listings</Link>
            <Link className="px-3 py-2 hover:bg-slate-200 rounded-lg" to="/report">Report an Issue</Link>
          </div>
        </div>
      </nav>
    </header>

    // <nav
    //   className="fixed w-full z-50 border-b shadow-sm"
    //   style={{ backgroundColor: '#DBDFE9' }}
    // >
    //   <div className="flex justify-between items-center px-8 py-3 gap-x-12 flex-wrap">
    //     <Link to="/" className="flex items-center gap-4 text-2xl font-bold min-w-fit">
    //       <img src={logo} alt="CiviChain Logo" className="h-8 w-auto" />
    //       <span style={{ color: '#212121' }}>
    //         CiviChain
    //       </span>
    //     </Link>
    //     <div className="flex items-center gap-10 flex-wrap min-w-0">
    //       <Link
    //         to="/"
    //         className={`transition-all relative group`}
    //         style={{ color: location.pathname === '/' ? '#EFF0A3' : '#212121' }}
    //         onMouseEnter={e => e.target.style.color = '#EFF0A3'}
    //         onMouseLeave={e => e.target.style.color = location.pathname === '/' ? '#EFF0A3' : '#212121'}
    //       >
    //         Home
    //         <span
    //           className="absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform"
    //           style={{
    //             backgroundColor: '#EFF0A3',
    //             height: '2px',
    //             display: location.pathname === '/' ? 'block' : 'none',
    //             transformOrigin: 'left'
    //           }}
    //         ></span>
    //       </Link>
    //       <Link
    //         to="/report"
    //         className={`transition-all relative group`}
    //         style={{ color: location.pathname === '/report' ? '#EFF0A3' : '#212121' }}
    //         onMouseEnter={e => e.target.style.color = '#EFF0A3'}
    //         onMouseLeave={e => e.target.style.color = location.pathname === '/report' ? '#EFF0A3' : '#212121'}
    //       >
    //         Report Issue
    //         <span
    //           className="absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform"
    //           style={{
    //             backgroundColor: '#EFF0A3',
    //             height: '2px',
    //             display: location.pathname === '/report' ? 'block' : 'none',
    //             transformOrigin: 'left'
    //           }}
    //         ></span>
    //       </Link>
    //       <Link
    //         to="/feed"
    //         className={`transition-all relative group`}
    //         style={{ color: location.pathname === '/feed' ? '#EFF0A3' : '#212121' }}
    //         onMouseEnter={e => e.target.style.color = '#EFF0A3'}
    //         onMouseLeave={e => e.target.style.color = location.pathname === '/feed' ? '#EFF0A3' : '#212121'}
    //       >
    //         Public Feed
    //         <span
    //           className="absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform"
    //           style={{
    //             backgroundColor: '#EFF0A3',
    //             height: '2px',
    //             display: location.pathname === '/feed' ? 'block' : 'none',
    //             transformOrigin: 'left'
    //           }}
    //         ></span>
    //       </Link>
    //       <Link
    //         to="/about"
    //         className={`transition-all relative group`}
    //         style={{ color: location.pathname === '/about' ? '#EFF0A3' : '#212121' }}
    //         onMouseEnter={e => e.target.style.color = '#EFF0A3'}
    //         onMouseLeave={e => e.target.style.color = location.pathname === '/about' ? '#EFF0A3' : '#212121'}
    //       >
    //         About
    //         <span
    //           className="absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform"
    //           style={{
    //             backgroundColor: '#EFF0A3',
    //             height: '2px',
    //             display: location.pathname === '/about' ? 'block' : 'none',
    //             transformOrigin: 'left'
    //           }}
    //         ></span>
    //       </Link>
    //       <Link
    //         to="/signin"
    //         className="px-6 py-2 rounded-xl transition-all transform hover:scale-105 whitespace-nowrap"
    //         style={{
    //           backgroundColor: '#EFF0A3',
    //           color: '#212121',
    //           marginLeft: '0.5rem'
    //         }}
    //         onMouseEnter={(e) => e.target.style.backgroundColor = '#CFDECA'}
    //         onMouseLeave={(e) => e.target.style.backgroundColor = '#EFF0A3'}
    //       >
    //         Sign In
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
