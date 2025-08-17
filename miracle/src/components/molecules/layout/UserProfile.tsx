import Avatar from '../../atoms/Avatar';
import Card from '../../atoms/Card';

interface UserProfileProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  showCard?: boolean;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export default function UserProfile({ 
  user, 
  showCard = true, 
  size = 'md',
  online = true 
}: UserProfileProps) {
  const content = (
    <div className="flex items-center">
      <Avatar
        src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
        alt={user?.name || "User"}
        size={size}
        online={online}
        className="flex-shrink-0"
      />
      <div className="ml-4 min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {user?.name || 'Admin User'}
        </p>
        <p className="text-xs text-gray-600 truncate">
          {user?.email || 'Administrator'}
        </p>
      </div>
    </div>
  );

  if (showCard) {
    return (
      <Card variant="gradient" className="mb-4">
        {content}
      </Card>
    );
  }

  return content;
}
