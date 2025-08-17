import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../Login/AuthContext";
import ProfileDropdown from "../../molecules/layout/ProfileDropdown";
import Logo from "../../atoms/Logo";
import { NAV_LINKS } from "../../../constants/navigation";
// Use a public asset served by Vite as the fallback logo
const defaultLogo = "/vite.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { } = useAuth();


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
            <Logo
              defaultLogo={defaultLogo}
              alt="Logo"
              className="h-8 w-8 object-contain rounded-full border border-gray-300 shadow"
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
              <Logo
                defaultLogo={defaultLogo}
                alt="Logo"
                className="h-18 w-18 object-contain rounded-full"
              />
            </div>
            <span className="text-xl font-extrabold text-white ml-2 hidden sm:block">
              Moringa
            </span>
          </Link>
        </div>

        {/* Links */}
        <ul className="flex flex-1 justify-center gap-4 md:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="flex flex-col items-center text-white hover:text-[#a5cc35] transition-all duration-200 group"
              >
                <div className="p-2 rounded-full group-hover:bg-white transition-all duration-200">
                  <link.icon size={20} />
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
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center text-white hover:text-[#a5cc35] transition-all duration-200 group"
              >
                <div className="p-2 rounded-full group-hover:bg-white transition-all duration-200">
                  <link.icon size={20} />
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
