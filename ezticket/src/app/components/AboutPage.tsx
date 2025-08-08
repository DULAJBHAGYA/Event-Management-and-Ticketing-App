'use client';

import { useState } from 'react';
import Navbar from './Navbar';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dulaj Upananda",
    position: "Founder & CEO",
    image: "/assets/images/team/ceo.jpg",
    description: "Leading EZTicket&apos;s vision to revolutionize event management in Sri Lanka."
  },
  {
    name: "Sarah Perera",
    position: "Head of Operations",
    image: "/assets/images/team/operations.jpg",
    description: "Ensuring seamless event operations and customer satisfaction."
  },
  {
    name: "Rajith Silva",
    position: "Technical Director",
    image: "/assets/images/team/tech.jpg",
    description: "Driving innovation in our ticketing platform and technology solutions."
  },
  {
    name: "Nimali Fernando",
    position: "Marketing Manager",
    image: "/assets/images/team/marketing.jpg",
    description: "Building EZTicket&apos;s brand presence across Sri Lanka."
  },
  {
    name: "Kumar Dias",
    position: "Customer Success Lead",
    image: "/assets/images/team/support.jpg",
    description: "Ensuring exceptional customer experience and support."
  },
  {
    name: "Priya Jayawardena",
    position: "Event Partnerships",
    image: "/assets/images/team/partnerships.jpg",
    description: "Building strong relationships with event organizers and venues."
  }
];

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              We provide the best event management and ticketing platform to our clients by maximizing innovation and technology.
            </p>
            
            {/* Rating Section */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="flex items-center gap-3">
                <span className="text-white text-xl font-semibold">Ratings</span>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-white">5.0</span>
                  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-12 h-12 bg-white/20 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">U{i}</span>
                    </div>
                  ))}
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2K+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Side - Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-full h-64 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
                  <div className="w-full h-64 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Our Values */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  Our Values
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                  Meet EZTicket.<br />
                  <span className="text-orange-400">Digital.</span> Innovative. Creative.
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Join a team who works as hard as you do and allows your business and technology to manipulate big data for better event experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Side - Our Mission */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                  We help people create and build amazing events.
                </h2>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  We have marked our presence across Sri Lanka, reaching over a million event-goers using our platform.
                </p>
                
                {/* Mission Points */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">01</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">EZTicket Business Vision</h4>
                      <p className="text-white/90">Great, consistent work means more than hours clocked. Dominating the event management industry is our top priority.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">02</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Our mission for sustainability</h4>
                      <p className="text-white/90">Building a sustainable platform that supports local events and promotes Sri Lankan culture.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">03</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Technology innovation</h4>
                      <p className="text-white/90">Leveraging cutting-edge technology to provide seamless ticketing and event management solutions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Team
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Meet the passionate team behind EZTicket&apos;s success
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-orange-400 font-semibold mb-3">{member.position}</p>
                <p className="text-white/90 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/90">Events Hosted</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">1M+</div>
                <div className="text-white/90">Tickets Sold</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-white/90">Event Organizers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">25+</div>
                <div className="text-white/90">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 