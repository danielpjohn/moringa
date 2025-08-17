// Login.tsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { User } from 'lucide-react';
import syncCartOnLogin from './api';
import AuthHeader from '../../molecules/auth/AuthHeader';
import InputFieldWithIcon from '../../molecules/auth/InputFieldWithIcon';
import PasswordField from '../../molecules/auth/PasswordField';
import AuthErrorMessage from '../../molecules/auth/AuthErrorMessage';
import AuthButton from '../../molecules/auth/AuthButton';
import AuthDivider from '../../molecules/auth/AuthDivider';
import GoogleSignInButton from '../../molecules/auth/GoogleSignInButton';
import AuthRedirectLink from '../../molecules/auth/AuthRedirectLink';
import { isUserAdmin } from '../../../constants/authUtils.ts';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login, user } = useAuth();


  // In your handleSubmit function in Login.tsx, modify the redirect logic:
 // Modify the handleSubmit function in Login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const authResponse = await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password
    });

    const { access, refresh } = authResponse.data;

    const userResponse = await axios.get('http://127.0.0.1:8000/user/', {
      headers: { 'Authorization': `Bearer ${access}` }
    });

    const userData = userResponse.data;
    
    // Sync cart after successful login
    try {
      await syncCartOnLogin(access);
    } catch (cartError) {
      console.error('Cart sync failed:', cartError);
      // Continue with login even if cart sync fails
    }
    
    await login(userData, { access, refresh });

    // Redirect based on role
    if (isUserAdmin(userData)) {
      navigate('/admin', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  } catch (err) {
    setIsLoading(false);
    setError('Invalid username or password');
    console.error('Login error:', err);
  }
};

  // Remove the already authenticated redirect logic at the top of the component
  // Just keep the form rendering logic
  // Handle already authenticated users

  if (isAuthenticated && user) {
    console.log('Already authenticated, user:', user);

    const isAdmin = isUserAdmin(user);
    console.log('Authenticated user is admin:', isAdmin);

    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  const handleGoogleSignIn = () => {
    // Add Google OAuth logic here
    console.log('Google sign in clicked');
  };

  const handleSignUpRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader 
          icon={User}
          title="Welcome back"
          subtitle="Sign in to your account"
        />

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputFieldWithIcon
              id="username"
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={User}
            />

            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {error && <AuthErrorMessage error={error} />}

            <AuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign in
            </AuthButton>

            <AuthDivider />

            <GoogleSignInButton onClick={handleGoogleSignIn} />
          </form>

          <AuthRedirectLink
            text="Don't have an account?"
            linkText="Sign up"
            onClick={handleSignUpRedirect}
          />
        </div>
      </div>
    </div>
  );
}