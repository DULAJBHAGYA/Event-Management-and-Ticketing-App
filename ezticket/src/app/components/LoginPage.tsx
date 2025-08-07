'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Samantha Fernando",
      role: "Event Enthusiast",
      location: "Colombo, Sri Lanka",
      rating: 5,
      comment: "EZTicket helped us discover and book amazing events across Sri Lanka with seamless experience and brilliant customer service."
    },
    {
      name: "Arjun Silva",
      role: "Concert Lover",
      location: "Galle, Sri Lanka",
      rating: 5,
      comment: "Best ticketing platform in Sri Lanka! Found amazing concerts and festivals. The booking process is so smooth and secure."
    },
    {
      name: "Priya Wijesinghe",
      role: "Family Event Organizer",
      location: "Kandy, Sri Lanka",
      rating: 4,
      comment: "Perfect for family events and cultural shows. Love how easy it is to find events happening around Sri Lanka."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
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
                 </div>
               </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Abstract Background with Testimonial */}
      <div className="hidden lg:flex w-3/5 relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 lg:rounded-tr-3xl lg:rounded-br-3xl">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(/assets/images/loginbg.jpg)' }}
        ></div>
        
                      {/* Back to Home Link - Upper Left Corner */}
              <div className="absolute top-6 left-6 z-20">
                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 hover:text-white transition-all duration-300 border border-white/30"
                  title="Back to Home"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium" style={{fontFamily: 'var(--font-geist-sans)'}}>Back to Home</span>
                </Link>
              </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
                  {/* Content */}
          <div className="relative z-10 flex flex-col justify-end p-12 text-white">
            {/* Welcome Text */}
            <div className="mb-8">
              <h2 className="text-5xl xl:text-6xl font-bold mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Welcome Back to EZTicket
              </h2>
              <p className="text-2xl xl:text-3xl text-white/90 leading-relaxed mb-4" style={{fontFamily: 'var(--font-geist-sans)', textShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'}}>
                Continue your journey to discover amazing events across beautiful Sri Lanka.
              </p>
              <p className="text-xl xl:text-2xl text-white/80 leading-relaxed" style={{fontFamily: 'var(--font-geist-sans)', textShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'}}>
                Join thousands of event enthusiasts who trust EZTicket for seamless booking experiences.
              </p>
            </div>
            
            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <div className="mb-6">
              <blockquote className="text-xl font-medium leading-relaxed">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-white/80">{testimonials[currentTestimonial].role}</div>
                <div className="text-white/70 text-sm">{testimonials[currentTestimonial].location}</div>
              </div>
              
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-white/80 text-sm font-medium">{testimonials[currentTestimonial].rating}.0</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-3" style={{fontFamily: 'var(--font-geist-sans)'}}>Login</h1>
            <p className="text-lg xl:text-xl text-gray-600" style={{fontFamily: 'var(--font-geist-sans)'}}>Log in to your account.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-base xl:text-lg font-semibold text-gray-700 mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-base xl:text-lg"
                style={{fontFamily: 'var(--font-geist-sans)'}}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm xl:text-base font-semibold text-gray-700 mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm xl:text-base"
                  style={{fontFamily: 'var(--font-geist-sans)'}}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-base"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded accent-orange-500"
                  style={{accentColor: '#f97316'}}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm xl:text-base text-gray-700 font-medium" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Remember me
                </label>
              </div>
              <Link 
                href="/forgot-password"
                className="text-sm xl:text-base text-orange-600 hover:text-orange-500 font-semibold"
                style={{fontFamily: 'var(--font-geist-sans)'}}
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 px-4 rounded-full font-bold text-base xl:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              Sign in
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-full font-semibold text-base xl:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl mb-2"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Apple Sign In */}
            <button
              type="button"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-full font-semibold text-base xl:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              style={{fontFamily: 'var(--font-geist-sans)'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-base xl:text-lg text-gray-600" style={{fontFamily: 'var(--font-geist-sans)'}}>
              Don't have an account?{' '}
              <Link href="/register" className="text-orange-600 hover:text-orange-500 font-bold" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 