'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register attempt:', { firstName, lastName, email, password, confirmPassword, agreeTerms });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex">
        {/* Abstract Background */}
        <div className="hidden lg:flex w-3/5 relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Image
                src="/assets/images/Logo.png"
                alt="EZTicket Logo"
                width={150}
                height={50}
                className="h-12 w-auto mx-auto mb-4"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Abstract Background with Testimonial */}
      <div className="hidden lg:flex w-3/5 relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          {/* Testimonial Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <div className="mb-6">
              <blockquote className="text-xl font-medium leading-relaxed">
                "Joining EZTicket was the best decision! Now I never miss out on amazing events happening around Sri Lanka."
              </blockquote>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">Rajesh Perera</div>
                <div className="text-white/80">Music Lover</div>
                <div className="text-white/70 text-sm">Kandy, Sri Lanka</div>
              </div>
              
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex space-x-4">
            <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              ←
            </button>
            <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <div className="mb-3">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors text-base xl:text-lg font-semibold"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              ← Back to Home
            </Link>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/assets/images/Logo.png"
              alt="EZTicket Logo"
              width={150}
              height={50}
              className="h-12 w-auto mx-auto mb-4"
              priority
            />
          </div>

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>Sign Up</h1>
            <p className="text-sm xl:text-base text-gray-600" style={{fontFamily: 'var(--font-geist-sans)'}}>Create your account to get started.</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-3">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs xl:text-sm font-semibold text-gray-700 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-xs xl:text-sm"
                  style={{fontFamily: 'var(--font-geist-sans)'}}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs xl:text-sm font-semibold text-gray-700 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-xs xl:text-sm"
                  style={{fontFamily: 'var(--font-geist-sans)'}}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs xl:text-sm font-semibold text-gray-700 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-xs xl:text-sm"
                style={{fontFamily: 'var(--font-geist-sans)'}}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs xl:text-sm font-semibold text-gray-700 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-xs xl:text-sm"
                  style={{fontFamily: 'var(--font-geist-sans)'}}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                >
                  👁️
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs xl:text-sm font-semibold text-gray-700 mb-1" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-xs xl:text-sm"
                style={{fontFamily: 'var(--font-geist-sans)'}}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-xs xl:text-sm text-gray-700 font-medium" style={{fontFamily: 'var(--font-geist-sans)'}}>
                I agree to the{' '}
                <Link href="/terms" className="text-orange-600 hover:text-orange-500 font-semibold" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-orange-600 hover:text-orange-500 font-semibold" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-2 px-4 rounded-full font-bold text-sm xl:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{fontFamily: 'var(--font-geist-sans)'}}
              disabled={!agreeTerms}
            >
              Sign up
            </button>

            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-full font-semibold text-sm xl:text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl mb-1"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Apple Sign Up */}
            <button
              type="button"
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full font-semibold text-sm xl:text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              <span>Sign up with Apple</span>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-2 text-center">
            <p className="text-sm xl:text-base text-gray-600" style={{fontFamily: 'var(--font-geist-sans)'}}>
              Already have an account?{' '}
              <Link href="/login" className="text-orange-600 hover:text-orange-500 font-bold" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 