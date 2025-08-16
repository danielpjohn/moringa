// ProfileDropdown.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUserCircle,
    FaSignOutAlt,
    FaCog,
    FaUser,
    FaSignInAlt
} from "react-icons/fa";
import { useAuth } from "../Login/AuthContext";

export default function ProfileDropdown({ isMobile = false }: { isMobile?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const handleSignOut = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            closeDropdown();
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLoginClick = () => {
        closeDropdown();
        navigate('/login');
    };

    // Get first letter of user's name or email
    const getUserInitial = () => {
        if (!user) return '';
        if (user.name) return user.name.charAt(0).toUpperCase();
        if (user.email) return user.email.charAt(0).toUpperCase();
        return '';
    };

    const userInitial = getUserInitial();
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];
    const colorIndex = userInitial.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex] || 'bg-blue-500';


    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                onClick={toggleDropdown}
                className={`flex flex-col items-center text-white hover:text-green-300 transition-all ${isMobile ? "" : "ml-4"} hover:scale-105 transition-transform duration-200`}
                aria-label={isAuthenticated ? "User profile" : "Account menu"}
                aria-expanded={isOpen}
            >
                {isAuthenticated ? (
                    user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User avatar"
                            className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} rounded-full object-cover border border-gray-300 hover:scale-105 transition-transform duration-200`}
                        />
                    ) : (
                        <div className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} rounded-full ${bgColor} flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform duration-200`}>
                            {userInitial}
                        </div>
                    )
                ) : (
                    <FaUserCircle
                        size={isMobile ? 24 : 28}
                        className="hover:scale-105 transition-transform duration-200"
                    />
                )}
                <span className="text-xs font-semibold mt-1">
                    {isAuthenticated ? "Profile" : "Account"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute ${isMobile ? "left-0" : "right-0"} mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    {isAuthenticated ? (
                        <>
                            {/* User Info Section */}
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || ""}
                                </p>
                            </div>

                            {/* Profile Link */}
                            <Link
                                to="/profile"
                                onClick={closeDropdown}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaUser className="mr-2" />
                                My Profile
                            </Link>

                            {/* Settings Link */}
                            <Link
                                to="/settings"
                                onClick={closeDropdown}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaCog className="mr-2" />
                                Settings
                            </Link>

                            {/* Sign Out Button */}
                            <button
                                onClick={handleSignOut}
                                disabled={isLoggingOut}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {isLoggingOut ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing out...
                                    </>
                                ) : (
                                    <>
                                        <FaSignOutAlt className="mr-2" />
                                        Sign Out
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        /* Unauthenticated User Menu */
                        <div className="py-1">
                            {/* Login Button */}
                            <button
                                onClick={handleLoginClick}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaSignInAlt className="mr-2" />
                                Login
                            </button>

                            {/* Optional: Register Button */}
                            <button
                                onClick={() => {
                                    closeDropdown();
                                    navigate('/register');
                                }}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaUser className="mr-2" />
                                Register
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}