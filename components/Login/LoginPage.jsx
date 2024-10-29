// components/LoginPage.jsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import HLogo from '../../public/headerlogo.png';
import FLogo from '../../public/footerlogo.png';
import { useLoginHandler } from '@/hooks/useLoginHandler';

const LoginPage = () => {
  const { 
    isFocusedPhoneOrEmail, 
    setIsFocusedPhoneOrEmail, 
    isFocusedPassword, 
    setIsFocusedPassword, 
    error, 
    handleSubmit 
  } = useLoginHandler();

  return (
    <div className="w-full max-w-md p-6 bg-transparent rounded-lg shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 text-white flex items-center justify-center text-3xl font-bold rounded-full">
          <Image src={HLogo} alt="header-logo-img" width={152} height={151} priority />
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <input
          type="text"
          name="phoneOrEmail"
          placeholder="Mobile number or email address"
          className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsFocusedPhoneOrEmail(true)}
          onBlur={() => setIsFocusedPhoneOrEmail(false)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsFocusedPassword(true)}
          onBlur={() => setIsFocusedPassword(false)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>

        <div className="text-center">
          <Link href="#" className="text-blue-500 hover:underline">
            Forgotten Password?
          </Link>
        </div>

        <div className="text-center mt-6">
          <button className="w-full py-3 border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-200">
            Create new account
          </button>
        </div>
      </form>

      {/* Footer with Image and Text */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-xs text-gray-500 font-roboto">from</span>
        <Image src={FLogo} alt="Footer Image" width={70} height={30} priority />
      </div>
    </div>
  );
};

export default LoginPage;
