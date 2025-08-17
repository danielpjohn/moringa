import React from 'react';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, avatar, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4'
  };

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ${borderClasses[size]} border-white shadow-lg`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center ${borderClasses[size]} border-white shadow-lg`}>
      <span className="text-white font-bold">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default UserAvatar;
