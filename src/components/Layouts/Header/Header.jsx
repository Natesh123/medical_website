import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import aayushiLogo from '../../../assets/images/logo1.jpg';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const location = useLocation();

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const prevCartCountRef = useRef(0);
  const dropdownRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartItems.length > prevCartCountRef.current && cartItems.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItems.length;
  }, [cartItems.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTogglePrimaryDropDown(false);
      }
    };

    if (togglePrimaryDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [togglePrimaryDropDown]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-[#064e3b] backdrop-blur-md border-b border-[#0f3c20] ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} ${isScrolled ? 'py-2 shadow-xl shadow-green-950/30' : 'py-4 shadow-none'}`}>

      <div className="w-full sm:w-11/12 px-4 sm:px-12 mx-auto flex justify-between items-center relative">

        <div className="flex items-center gap-6 xl:gap-8">
          <Link className="flex items-center group transform transition-all duration-500" to="/" onClick={closeMobileMenu}>
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-1 shadow-md overflow-hidden">
                <img draggable="false" className="w-full h-full object-contain relative z-10" src={aayushiLogo} alt="Shree Kishan Aayushi" />
              </div>
            </div>
            <div className="ml-4 hidden md:flex flex-col text-left">
              <h1 className="text-xl lg:text-2xl font-semibold text-white tracking-tight leading-none group-hover:text-primary-orange transition-colors duration-300">
                SHREE KISHAN <span className="text-primary-orange">AAYUSHI</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-6 h-0.5 bg-primary-orange rounded-full"></span>
                <p className="text-xs font-semibold text-green-200 uppercase tracking-widest leading-none">Clinical Procurement</p>
              </div>
            </div>
          </Link>
        </div>

        {/* 💥 Desktop Navigation - Ultra Clean */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 relative">
          <nav className="flex items-center gap-6 xl:gap-10">
            {[
              { label: 'Home', path: '/home' },
              { label: 'Products', path: '/products' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map((nav) => (
              <Link key={nav.path} to={nav.path} className={`group relative py-2 font-semibold text-base lg:text-[17px] tracking-wide transition-all duration-300 ${location.pathname === nav.path ? 'text-primary-orange' : 'text-green-50 hover:text-white'}`}>
                {nav.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-orange transition-all duration-300 rounded-full ${location.pathname === nav.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="h-6 w-px bg-green-700/50 mx-2"></div>

          <Link to="/cart" className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-white/10 group ${cartPulse ? 'animate-pulse scale-110' : ''}`}>
            <ShoppingCartIcon sx={{ fontSize: "20px", color: '#fff' }} className="group-hover:text-primary-orange transition-colors duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-orange text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#064e3b] shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group/user" ref={dropdownRef}>
              <div
                className="flex items-center gap-3 cursor-pointer pl-3 pr-2 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-transparent hover:border-white/30"
                onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
              >
                <div className="w-7 h-7 rounded-full bg-primary-orange flex items-center justify-center text-white shadow-sm">
                  <PersonIcon sx={{ fontSize: "16px" }} />
                </div>
                <div className="flex flex-col pr-1">
                  <span className="text-white font-semibold text-base leading-none">{user.name && user.name.split(" ", 1)}</span>
                </div>
                {togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: 16, color: '#fff' }} /> : <ExpandMoreIcon sx={{ fontSize: 16, color: '#fff' }} />}
              </div>
              {togglePrimaryDropDown && (
                <div className="absolute top-[130%] right-0 w-56 animate-slideDown shadow-xl rounded-2xl overflow-hidden border border-gray-100 bg-white">
                  <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2.5 font-semibold text-base rounded-xl transition-all duration-300 bg-primary-orange text-white shadow-lg hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0">
              Login
            </Link>
          )}
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2 z-50 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

      </div>

      {/* 📱 Mobile Dropdown Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-[#064e3b] z-40 transition-all duration-500 pt-20
        ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col gap-6 p-8 text-white font-semibold text-lg">
          <li><Link to="/home" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><HomeIcon sx={{ fontSize: "24px" }} /> Home</Link></li>
          <li><Link to="/about" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><InfoIcon sx={{ fontSize: "24px" }} /> About</Link></li>
          <li><Link to="/products" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><CategoryIcon sx={{ fontSize: "24px" }} /> Products</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><ContactMailIcon sx={{ fontSize: "24px" }} /> Contact</Link></li>
          <li><Link to="/cart" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><ShoppingCartIcon sx={{ fontSize: "24px" }} /> Cart ({cartItems.length})</Link></li>
          <li className="pt-6 border-t border-white/20">
            {isAuthenticated ? (
              <div className="flex flex-col gap-6">
                <Link to="/profile" onClick={closeMobileMenu} className="flex items-center gap-4 hover:text-primary-orange transition-colors"><PersonIcon sx={{ fontSize: "24px" }} /> Profile</Link>
              </div>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="w-full block text-center py-4 bg-primary-orange rounded-xl text-white">Login</Link>
            )}
          </li>
        </ul>
      </div>

    </header>
  );
};

export default Header;

