import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

// Header Component
const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { name: "Movies", path: "/movies" },
    { name: "Stream", path: "/stream" },
    { name: "Events", path: "/events" },
    { name: "Plays", path: "/plays" },
    { name: "Sports", path: "/sports" },
    { name: "Activities", path: "/activities" }
  ];

  const secondaryNavItems = [
    { name: "ListYourShow", path: "/list-show" },
    { name: "Corporates", path: "/corporates" },
    { name: "Offers", path: "/offers" },
    { name: "Gift Cards", path: "/gift-cards" }
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Search Section */}
            <div className="flex items-center flex-1">
              <Link to="/" className="flex-shrink-0 mr-4">
                <span className="text-red-600 font-bold text-xl">bookmyshow</span>
              </Link>

              <div className="hidden md:block flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for Movies, Events, Plays, Sports and Activities"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700"
                >
                  <span>Kolkata</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isLocationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mumbai</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delhi</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bangalore</a>
                  </div>
                )}
              </div>

              <button className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600">
                Sign in
              </button>

              <button 
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:block py-2">
            <div className="flex justify-between">
              <div className="flex space-x-8">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-gray-700 hover:text-gray-900 ${
                      location.pathname === item.path ? 'text-red-600 font-medium' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex space-x-8">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-gray-700 hover:text-gray-900 ${
                      location.pathname === item.path ? 'text-red-600 font-medium' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold text-lg">Menu</span>
          <button 
            onClick={() => setIsSideMenuOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          <div className="px-2">
            <div className="py-2">
              <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h3>
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSideMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md ${
                    location.pathname === item.path ? 'bg-gray-50 text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-2 border-t">
              <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Additional Links</h3>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSideMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md ${
                    location.pathname === item.path ? 'bg-gray-50 text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Page Components
const HomePage = () => <div className="pt-32 px-4">Home Page Content</div>;
const MoviesPage = () => <div className="pt-32 px-4">Movies Page Content</div>;
const StreamPage = () => <div className="pt-32 px-4">Stream Page Content</div>;
const EventsPage = () => <div className="pt-32 px-4">Events Page Content</div>;
const PlaysPage = () => <div className="pt-32 px-4">Plays Page Content</div>;
const SportsPage = () => <div className="pt-32 px-4">Sports Page Content</div>;
const ActivitiesPage = () => <div className="pt-32 px-4">Activities Page Content</div>;

// App Layout
const AppLayout = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/stream" element={<StreamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/plays" element={<PlaysPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/list-show" element={<div className="pt-32 px-4">List Your Show Page</div>} />
            <Route path="/corporates" element={<div className="pt-32 px-4">Corporates Page</div>} />
            <Route path="/offers" element={<div className="pt-32 px-4">Offers Page</div>} />
            <Route path="/gift-cards" element={<div className="pt-32 px-4">Gift Cards Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppLayout;
