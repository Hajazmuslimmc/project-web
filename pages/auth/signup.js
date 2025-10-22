import { getProviders, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp({ providers }) {
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('Member');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just redirect to sign in
    // In a real app, you'd create the account with role
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Web Games Marketplace as a Creator or Member
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              Select your role:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userRole"
                  value="Member"
                  checked={userRole === 'Member'}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="mr-2"
                />
                Member (Browse & Purchase)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userRole"
                  value="Creator"
                  checked={userRole === 'Creator'}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="mr-2"
                />
                Creator (Sell Services)
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            {Object.values(providers).map((provider) => {
              if (provider.id === 'email') return null;
              return (
                <div key={provider.name} className="mt-6">
                  <button
                    onClick={() => signIn(provider.id)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
                  >
                    Sign up with {provider.name}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
