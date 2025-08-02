import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Scroll to About Us if on homepage
  const handleAboutClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('about-us');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/auth');
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100 shadow-md sticky top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-rose-800 tracking-wider mb-2 md:mb-0">
          SHE Shield 💖
        </h1>

        <nav>
          <ul className="flex flex-wrap gap-4 md:gap-6 text-rose-800 font-semibold text-sm md:text-md justify-center items-center">
            <li><Link to="/" className="hover:text-rose-600">Home</Link></li>
            <li>
              <a
                href="/#about-us"
                onClick={handleAboutClick}
                className="hover:text-rose-600 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li><Link to="/live-location" className="hover:text-rose-600">Live Location</Link></li>
            <li><Link to="/chat" className="hover:text-rose-600">ChatBot</Link></li>
            <li><Link to="/opportunities" className="hover:text-rose-600">Opportunities</Link></li>
            <li><Link to="/community" className="hover:text-rose-600">Blog Posts</Link></li>
            <li><Link to="/upload-post" className="hover:text-rose-600">Add Post</Link></li>

            {!currentUser ? (
              <li>
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-4 py-2 rounded-full hover:scale-105 shadow-md transition duration-300"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={
                      currentUser.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=FBCFE8&color=9D174D`
                    }
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-rose-400"
                  />
                  <span className="font-medium text-sm">{currentUser.name || 'User'}</span>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg transition-all duration-200 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-rose-700 hover:bg-pink-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-pink-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}

            <li>
              <a
                href="https://forms.gle/KGCGjZfmnUq648RXA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full hover:scale-105 shadow-md transition duration-300"
              >
                Feedback
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
