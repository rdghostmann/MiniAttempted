"use client";
import Link from 'next/link';
import Image from 'next/image';
import HeaderImage from '../../public/header-main.png';
import CenteredLogo from '../../public/headerlogo.png';
import { useLoginHandler } from '@/hooks/useLoginHandler';
import Loading from '@/app/loading'; // Import your Loading component

export default function LoginForm() {
  const {
    isFocusedPhoneOrEmail,
    setIsFocusedPhoneOrEmail,
    isFocusedPassword,
    setIsFocusedPassword,
    error,
    handleSubmit,
    isLoading, // Get loading state
  } = useLoginHandler();

  return (
    <div className={`relative w-full h-screen max-w-md p-0 bg-gray-900 ${isFocusedPhoneOrEmail || isFocusedPassword ? 'flex flex-col items-center justify-center' : ''}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loading /> {/* This will render your loading component */}
        </div>
      )}

      {!(isFocusedPhoneOrEmail || isFocusedPassword) ? (
        <div className="w-full ">
          <Image src={HeaderImage} alt="Header Graphic" width={511} height={288} className="w-full" priority />
        </div>
      ) : (
        <div className="flex justify-center m-8">
          <div className="w-16 h-16 text-white flex items-center justify-center text-3xl font-bold rounded-full">
            <Image src={CenteredLogo} alt="Centered Logo" width={152} height={151} priority />
          </div>
        </div>
      )}

      {!(isFocusedPhoneOrEmail || isFocusedPassword) && (
        <div className="text-center mb-6" style={{ color: '#fff', fontSize: '13px', margin: '15px 0 30px 0' }}>
          <p> Polski • Español • <span className="text-blue-500">More...</span></p>
        </div>
      )}

      <div className="w-full px-6 py-8 bg-gray-900 text-white rounded-lg">
        <form style={{ width: '90%', marginInline: 'auto' }} onSubmit={handleSubmit} className="mx-auto space-y-6">
          <div className="relative">
            <input
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                borderBottom: isFocusedPhoneOrEmail ? '2px solid #3b82f6' : 'none',
              }}
              type="text"
              name="phoneOrEmail"
              placeholder="Phone number or email address"
              onFocus={() => setIsFocusedPhoneOrEmail(true)}
              onBlur={() => setIsFocusedPhoneOrEmail(false)}
              className="w-full px-4 py-3 bg-gray-700 text-gray-300 outline-none focus:ring-b-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-400">
              <i className="fas fa-info-circle"></i>
            </span>
          </div>

          <div className="relative">
            <input
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                borderBottom: isFocusedPassword ? '2px solid #3b82f6' : 'none',
              }}
              type="password"
              name="password"
              placeholder="Password"
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
              className="w-full px-4 py-3 bg-gray-700 text-gray-300 outline-none focus:ring-b-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>

          <div className="text-center">
            <Link href="#" className="text-blue-500 hover:underline text-sm font-semibold">
              Forgotten password?
            </Link>
          </div>

          {!(isFocusedPhoneOrEmail || isFocusedPassword) && (
            <>
              <div style={{ position: 'relative' }} className="relative flex items-center justify-between my-6">
                <hr className="w-full border-gray-500" />
                <span
                  style={{
                    width: '1.875rem',
                    textAlign: 'center',
                    height: '1.875rem',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    background: '#1f2937',
                    marginBlock: '.625rem',
                    padding: '.3125rem 0 .3125rem 0',
                    fontSize: '10px',
                    borderRadius: '50%',
                  }}
                  className="absolute left-1/2 transform -translate-x-1/2 text-sm bg-slate-800 p-3 rounded-full text-gray-500"
                >
                  OR
                </span>
              </div>

              <button
                style={{ background: '#16a34a' }}
                type="button"
                className="w-full py-3 text-white font-semibold rounded hover:bg-green-700 transition duration-200"
              >
                Create New Account
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
