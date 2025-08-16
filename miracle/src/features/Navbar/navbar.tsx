import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../Login/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import defaultLogo from "../logo/treelogo.png";

const navLinks = [
  { name: "Home", path: "/home", icon: <FaHome size={20} /> },
  { name: "About", path: "/about", icon: <FaInfoCircle size={20} /> },
  { name: "Products", path: "/products", icon: <FaBoxOpen size={20} /> },
  { name: "Recipe", path: "/recipe", icon: <FaInfoCircle size={20} /> },
  { name: "Cart", path: "/cart", icon: <FaShoppingCart size={20} /> },
  { name: "Contact", path: "/contact", icon: <FaEnvelope size={20} /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(defaultLogo);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-all-images/");
        if (response.ok) {
          const data: Array<{ id: number; image: string; uploaded_at: string }> =
            await response.json();
          const logo =
            data.find((item) =>
              item.image.toLowerCase().includes("logo")
            ) || data[0];
          if (logo) setLogoUrl(logo.image);
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      }
    };

    fetchLogo();
  }, []);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = defaultLogo;
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className="bg-[#17322b] shadow-lg w-[90%] max-w-7xl mx-auto py-3 px-6 sticky top-4 z-50 rounded-2xl border border-gray-200"
    >
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between md:hidden">
        <ProfileDropdown isMobile={true} />
        <Link to="/" className="flex items-center">
          <div className="p-1 bg-[#a5cc35] rounded-full">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-8 w-8 object-contain rounded-full border border-gray-300 shadow"
              onError={handleImageError}
            />
          </div>
        </Link>
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Top Bar */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <div className="p-1 bg-[#a5cc35] rounded-full">
              <img
                src={logoUrl}
                alt="Logo"
                className="h-18 w-18 object-contain rounded-full"
                onError={handleImageError}
              />
            </div>
            <span className="text-xl font-extrabold text-white ml-2 hidden sm:block">
              Moringa
            </span>
          </Link>
        </div>

        {/* Links */}
        <ul className="flex flex-1 justify-center gap-4 md:gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="flex flex-col items-center text-white hover:text-[#a5cc35] transition-all duration-200 group"
              >
                <div className="p-2 rounded-full group-hover:bg-white transition-all duration-200">
                  {link.icon}
                </div>
                <span className="text-xs font-semibold mt-1 ">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ProfileDropdown isMobile={false} />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center gap-4 border-t pt-4 border-white/30">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center text-white hover:text-[#a5cc35] transition-all duration-200 group"
              >
                <div className="p-2 rounded-full group-hover:bg-white transition-all duration-200">
                  {link.icon}
                </div>
                <span className="text-xs font-semibold mt-1">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
