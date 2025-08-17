import { NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon';
import { ADMIN_ICONS } from '../../../constants/icons';

interface NavigationLinkProps {
  title: string;
  path: string;
  icon: keyof typeof ADMIN_ICONS;
  color: string;
  bgColor: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function NavigationLink({ 
  title, 
  path, 
  icon, 
  color, 
  bgColor, 
  onClick,
  isMobile = false 
}: NavigationLinkProps) {
  const baseClasses = isMobile 
    ? "flex items-center px-4 py-4 mx-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all duration-200"
    : "flex items-center px-4 py-4 rounded-xl transition-all duration-200 group hover:shadow-md";

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${
          isActive
            ? isMobile
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-l-4 border-green-500 font-semibold shadow-sm'
              : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold shadow-lg border-l-4 border-green-500'
            : isMobile
              ? ''
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900'
        }`
      }
      end
    >
      {({ isActive }) => (
        <>
          <div className={`p-${isMobile ? '2' : '3'} rounded-lg transition-all duration-200 ${
            isActive ? bgColor : 'bg-gray-100 group-hover:bg-gray-200'
          } mr-${isMobile ? '3' : '4'}`}>
            <Icon 
              name={icon} 
              className={`transition-colors duration-200 ${
                isActive ? color : 'text-gray-600 group-hover:text-gray-700'
              }`} 
            />
          </div>
          <span className="text-sm font-medium">{title}</span>
        </>
      )}
    </NavLink>
  );
}
