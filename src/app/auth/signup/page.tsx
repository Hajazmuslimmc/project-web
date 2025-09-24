'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const { user, loading, signInWithCustom } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate simple math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`${num1} + ${num2} = ?`);
    return num1 + num2;
  };

  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    setCorrectAnswer(generateCaptcha());
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (parseInt(captchaAnswer) !== correctAnswer) {
      setError('Incorrect CAPTCHA answer. Please try again.');
      setCorrectAnswer(generateCaptcha());
      setCaptchaAnswer('');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithCustom(username.trim());
      // Success - user will be redirected by useEffect
    } catch (error: any) {
      setError(error.message || 'Failed to create account. Please try again.');
      setCorrectAnswer(generateCaptcha());
      setCaptchaAnswer('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const regenerateCaptcha = () => {
    setCorrectAnswer(generateCaptcha());
    setCaptchaAnswer('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Join NetworkAK and start gaming instantly
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Choose Your Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your username"
              />
              {username && (
                <p className="mt-2 text-sm text-gray-400">
                  Your email will be: <span className="text-primary-400">{username}@fc</span>
                </p>
              )}
            </div>

            {/* CAPTCHA Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Verify You're Human
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                    <span className="text-white font-mono text-lg">{captchaQuestion}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={regenerateCaptcha}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Generate new question"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter the answer"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-md p-3">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300 underline">
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              By signing up, you agree to our{' '}
              <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
