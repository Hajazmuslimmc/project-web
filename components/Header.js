import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Web Games Marketplace
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href="/explore" className="hover:text-gray-200">
            Explore
          </Link>
          <Link href="/create" className="hover:text-gray-200">
            Create
          </Link>
          <Link href="/profile" className="hover:text-gray-200">
            Profile
          </Link>

          {status === 'loading' ? (
            <span>Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span>{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
