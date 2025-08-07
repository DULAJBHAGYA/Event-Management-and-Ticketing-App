'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: ''
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      {/* Navbar */}
      <Navbar />

      {/* Navigation spacing */}
      <div className="pt-24 sm:pt-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl xl:text-7xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)', textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}>
              Contact Us
            </h1>
            <p className="text-2xl xl:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'var(--font-geist-sans)', textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}}>
              Get in touch with EZTicket team. We&apos;re here to help with your events and ticketing needs across Sri Lanka.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            
            {/* Left Side - Contact Information & Quick Help */}
            <div className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Get In Touch
                </h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl xl:text-3xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Phone</h3>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Customer Support: +94 11 234 5678</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Business Inquiries: +94 11 234 5679</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl xl:text-3xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Email</h3>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>support@ezticket.lk</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>partnerships@ezticket.lk</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>media@ezticket.lk</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl xl:text-3xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Office</h3>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>123 Galle Road</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Colombo 03, Sri Lanka</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl xl:text-3xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Business Hours</h3>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-lg xl:text-xl text-white/90" style={{fontFamily: 'var(--font-geist-sans)'}}>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Help Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Quick Help
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link 
                    href="/help/organizers" 
                    className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Event Organizers</h3>
                    <p className="text-white/80 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>Partnership inquiries, event listing</p>
                  </Link>
                  
                  <Link 
                    href="/help/customers" 
                    className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Customers</h3>
                    <p className="text-white/80 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>Ticket issues, refunds, support</p>
                  </Link>
                  
                  <Link 
                    href="/help/technical" 
                    className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Technical</h3>
                    <p className="text-white/80 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>Website issues, app problems</p>
                  </Link>
                  
                  <Link 
                    href="/help/media" 
                    className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Media</h3>
                    <p className="text-white/80 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>Press inquiries, interviews</p>
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Follow Us
                </h2>
                
                <div className="flex space-x-4">
                  {/* Twitter */}
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  
                  {/* Facebook */}
                  <a href="#" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* Threads */}
                  <a href="#" className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.7-1.651-.768-.752-2.12-.761-4.315-.761h-.116c-1.329 0-2.81.128-4.135.913-.962.57-1.823 1.455-2.564 2.63l-1.737-1.072c.895-1.42 2.023-2.598 3.357-3.507 1.757-1.2 3.72-1.317 5.195-1.317h.116c3.646 0 6.246.835 7.305 2.347.897.908 1.409 2.074 1.632 3.714 1.086.34 1.976.912 2.579 1.685 1.034 1.328 1.117 3.064.246 5.162-.99 2.384-3.145 4.243-6.081 5.24-1.632.556-3.419.831-5.31.814Zm2.787-15.296c-1.163.069-2.148.435-2.849 1.058-.688.611-.99 1.352-.949 2.201.033.69.408 1.31.997 1.651.537.31 1.296.467 2.092.428 1.07-.054 1.91-.506 2.5-1.34.407-.578.665-1.307.768-2.17a9.566 9.566 0 0 0-2.559-.828Z"/>
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg xl:text-xl"
                        style={{fontFamily: 'var(--font-geist-sans)'}}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg xl:text-xl"
                        style={{fontFamily: 'var(--font-geist-sans)'}}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Inquiry Type Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg xl:text-xl"
                        style={{fontFamily: 'var(--font-geist-sans)'}}
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="inquiryType" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg xl:text-xl"
                        style={{fontFamily: 'var(--font-geist-sans)'}}
                        required
                      >
                        <option value="" className="bg-gray-800">Select inquiry type</option>
                        <option value="general" className="bg-gray-800">General Question</option>
                        <option value="event-organizer" className="bg-gray-800">Event Organizer</option>
                        <option value="ticket-support" className="bg-gray-800">Ticket Support</option>
                        <option value="partnership" className="bg-gray-800">Partnership</option>
                        <option value="media" className="bg-gray-800">Media Inquiry</option>
                        <option value="technical" className="bg-gray-800">Technical Issue</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg xl:text-xl"
                      style={{fontFamily: 'var(--font-geist-sans)'}}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-2 text-lg xl:text-xl" style={{fontFamily: 'var(--font-geist-sans)'}}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-5 py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-lg xl:text-xl"
                      style={{fontFamily: 'var(--font-geist-sans)'}}
                      placeholder="Please provide details about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-5 px-8 rounded-full font-bold text-xl xl:text-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{fontFamily: 'var(--font-geist-sans)'}}
                  >
                    Send Message
                  </button>
                </form>

                {/* Response Time Info */}
                <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-white/90 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>
                    <strong>Response Time:</strong> We typically respond within 24 hours during business days. 
                    For urgent matters, please call our support line.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Find Us
              </h2>
              
              {/* Google Maps */}
              <div className="bg-white/20 rounded-xl overflow-hidden border border-white/30">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4808.028067830653!2d79.84779433156562!3d6.906187992757082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b8b2c88ff%3A0x4537fcdaf592ff11!2sGalle%20Face%2C%20Colombo!5e0!3m2!1sen!2slk!4v1754507876902!5m2!1sen!2slk" 
                  width="100%" 
                  height="400" 
                  style={{border: 0}} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-64 sm:h-80 lg:h-96"
                ></iframe>
              </div>
              
              {/* Directions */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Nearest Landmarks</h3>
                  <ul className="text-white/90 space-y-1 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>
                    <li>• Galle Face Green (5 min walk)</li>
                    <li>• Colombo Fort Railway Station (10 min)</li>
                    <li>• World Trade Center (3 min walk)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="text-xl xl:text-2xl font-semibold text-white mb-2" style={{fontFamily: 'var(--font-geist-sans)'}}>Parking</h3>
                  <p className="text-white/90 text-base xl:text-lg" style={{fontFamily: 'var(--font-geist-sans)'}}>
                    Paid parking available in nearby World Trade Center. 
                    Street parking also available on Galle Road.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 