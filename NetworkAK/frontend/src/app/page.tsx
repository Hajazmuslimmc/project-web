import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#0070ba]">NetworkAK</div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-[#0070ba] transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#0070ba] text-white px-6 py-2 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#009cde] transition-colors duration-200"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="text-[#0070ba]">NetworkAK</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Experience the future of secure online marketplace transactions.
              Join as a Member, Cretro, or Peruim and unlock premium features.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-[#0070ba] text-white px-8 py-4 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#009cde] transition-colors duration-200 text-center"
              >
                Get Started Free
              </Link>
              <Link
                href="/auth/signin"
                className="border-2 border-[#0070ba] text-[#0070ba] px-8 py-4 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#0070ba] hover:text-white transition-colors duration-200 text-center"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Member (Buyer) Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-[#f7f9fb] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#0070ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Member</h3>
                <p className="text-gray-600 mb-4">Browse and buy items securely with our marketplace protection.</p>
                <div className="text-[#0070ba] font-semibold">Browse items</div>
              </div>

              {/* Cretro (Seller) Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-[#f7f9fb] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#0070ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cretro</h3>
                <p className="text-gray-600 mb-4">List and sell your items with our seller protection guarantee.</p>
                <div className="text-[#0070ba] font-semibold">Start selling</div>
              </div>

              {/* Peruim (Premium) Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-[#f7f9fb] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#0070ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Peruim</h3>
                <p className="text-gray-600 mb-4">Exclusive premium features with VIP access and premium discounts.</p>
                <div className="text-[#0070ba] font-semibold">Upgrade to premium</div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-20 bg-[#f7f9fb] rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Secure & Trusted</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                NetworkAK uses industry-leading security measures including email OTP verification
                and encrypted transactions to keep your data safe and secure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Email OTP Verification</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">PayPal Integration</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[#0070ba] text-2xl font-bold mb-4">NetworkAK</div>
          <p className="text-gray-600">© 2025 NetworkAK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
