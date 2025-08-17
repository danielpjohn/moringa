import { useState } from 'react';
import { Mail, User, Shield } from 'lucide-react';
import AuthHeader from '../../molecules/auth/AuthHeader';
import InputFieldWithIcon from '../../molecules/auth/InputFieldWithIcon';
import PasswordField from '../../molecules/auth/PasswordField';
import AuthErrorMessage from '../../molecules/auth/AuthErrorMessage';
import AuthButton from '../../molecules/auth/AuthButton';
import AuthRedirectLink from '../../molecules/auth/AuthRedirectLink';
import { useAuth } from './AuthContext';

export default function Register() {
    const { login } = useAuth();
    const [step, setStep] = useState('email');
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const API_BASE_URL = 'http://127.0.0.1:8000';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOTP = async () => {
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/send-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email
                })
            });

            if (response.ok) {
                setOtpSent(true);
                setStep('otp');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp
                })
            });

            if (response.ok) {
                setStep('register');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Failed to verify OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    password: formData.password
                })
            });

            if (response.ok) {
                const data = await response.json();
                const access = data?.access;
                const refresh = data?.refresh;

                if (!access || !refresh) {
                    throw new Error('Missing tokens in registration response');
                }

                // Fetch current user details using the access token
                const userRes = await fetch(`${API_BASE_URL}/user/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access}`,
                    },
                });

                if (!userRes.ok) {
                    throw new Error('Failed to fetch user after registration');
                }

                const userData = await userRes.json();

                // Persist tokens and initialize authenticated state (also syncs cart)
                await login(userData, { access, refresh });

                // Redirect to home
                window.location.href = '/home';
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
            }
        } catch (err) {
            setError('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="max-w-md w-full space-y-8">
                <AuthHeader 
                    icon={step === 'email' ? Mail : step === 'otp' ? Shield : User}
                    title={step === 'email' ? 'Verify Email' : step === 'otp' ? 'Enter OTP' : 'Create Account'}
                    subtitle={step === 'email' ? "We'll send you a verification code" : step === 'otp' ? 'Check your email for the OTP' : 'Complete your registration'}
                />

                {/* Form */}
                <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100" onSubmit={handleRegister}>
                    <div className="space-y-6">
                        {/* EMAIL STEP */}
                        {step === 'email' && (
                            <>
                                <InputFieldWithIcon
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={Mail}
                                />

                                <AuthButton
                                    onClick={handleSendOTP}
                                    isLoading={isLoading}
                                    loadingText="Sending OTP..."
                                >
                                    Send Verification Code
                                </AuthButton>
                            </>
                        )}

                        {/* OTP STEP */}
                        {step === 'otp' && (
                            <>
                                <InputFieldWithIcon
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    label="Verification Code"
                                    placeholder="Enter 6-digit OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    icon={Shield}
                                />
                                {otpSent && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        OTP sent to {formData.email}. Didn't receive it?{' '}
                                        <button
                                            type="button"
                                            onClick={handleSendOTP}
                                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    </p>
                                )}

                                <AuthButton
                                    onClick={handleVerifyOTP}
                                    isLoading={isLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify Code
                                </AuthButton>
                            </>
                        )}

                        {/* REGISTER STEP */}
                        {step === 'register' && (
                            <>
                                <InputFieldWithIcon
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={User}
                                />

                                <PasswordField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    showPassword={showPassword}
                                    onTogglePassword={() => setShowPassword(!showPassword)}
                                />

                                <PasswordField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    showPassword={showConfirmPassword}
                                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                />

                                <AuthButton
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Creating Account..."
                                >
                                    Complete Registration
                                </AuthButton>
                            </>
                        )}

                        {error && <AuthErrorMessage error={error} />}
                    </div>

                    <AuthRedirectLink
                        text="Already have an account?"
                        linkText="Sign in"
                        onClick={handleSignInRedirect}
                    />
                </form>
            </div>
        </div>
    );
}