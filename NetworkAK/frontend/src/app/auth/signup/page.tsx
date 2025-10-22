'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.union([z.literal('member'), z.literal('cretro'), z.literal('peruim')])
});

type SignupFormData = z.infer<typeof signupSchema>;

const USER_TYPES = [
  {
    key: 'member',
    title: 'Member',
    subtitle: 'Buyer',
    description: 'Browse and purchase items with marketplace protection',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    key: 'cretro',
    title: 'Cretro',
    subtitle: 'Seller',
    description: 'List and sell your items with seller protection guarantee',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    key: 'peruim',
    title: 'Peruim',
    subtitle: 'Premium',
    description: 'Exclusive premium features with VIP access',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail(data.email);
        setShowOTP(true);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setValue('role', role as 'member' | 'cretro' | 'peruim');
  };

  if (showOTP) {
    return <EmailVerification email={email} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#0070ba]">
            NetworkAK
          </Link>
          <Link
            href="/auth/signin"
            className="text-gray-700 hover:text-[#0070ba] transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join NetworkAK</h1>
            <p className="text-gray-600">Create your account and start your journey</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Choose your account type</h2>
            <div className="grid grid-cols-1 gap-4">
              {USER_TYPES.map((type) => (
                <div
                  key={type.key}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedRole === type.key
                      ? 'border-[#0070ba] bg-[#f7f9fb]'
                      : 'border-gray-200 hover:border-[#009cde]'
                  }`}
                  onClick={() => handleRoleSelect(type.key)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-[#0070ba]">
                      {type.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{type.title}</h3>
                      <p className="text-sm text-gray-500">{type.subtitle}</p>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                    <div className="ml-auto">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === type.key ? 'border-[#0070ba] bg-[#0070ba]' : 'border-gray-300'
                      }`}>
                        {selectedRole === type.key && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Registration Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:border-transparent"
                  placeholder="Create a password (min 6 characters)"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !selectedRole}
                className={`w-full bg-[#0070ba] text-white py-3 px-4 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#009cde] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#0070ba] hover:text-[#009cde] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Email Verification Component
function EmailVerification({ email }: { email: string }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setMessage('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Email verified successfully! Redirecting...');
        // Store token in localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage(result.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setMessage('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setMessage('');

    try {
      // Note: In a real app, you'd call a resend endpoint
      setMessage('OTP resent to your email');
    } catch (error) {
      setMessage('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-300 rounded text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:border-transparent"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            {message && (
              <p className={`text-sm text-center ${
                message.includes('successfully') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}

            <button
              onClick={handleVerify}
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-[#0070ba] text-white py-3 px-4 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#009cde] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-[#0070ba] hover:text-[#009cde] text-sm underline disabled:opacity-50"
              >
                {resendLoading ? 'Resending...' : 'Resend Code'}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/auth/signup" className="text-[#0070ba] hover:text-[#009cde] text-sm">
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
