'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';



export default function AddEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    location: '',
    address: '',
    date: '',
    time: '',
    duration: '',
    organizer: '',
    organizerContact: '',
    highlights: [''],
    terms: [''],
    ticketTypes: [
      {
        id: 'general',
        name: 'General Admission',
        description: 'Standard event access',
        price: 0,
        availableTickets: 0,
        benefits: [''],
      }
    ]
  });

  const router = useRouter();

  const categories = [
    'Music',
    'Drama',
    'Cultural',
    'Adventure',
    'Conference',
    'Sports',
    'Comedy',
    'Workshop',
    'Exhibition',
    'Other'
  ];

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTicketTypeChange = (index: number, field: string, value: string | number | string[]) => {
    const updatedTicketTypes = [...formData.ticketTypes];
    updatedTicketTypes[index] = {
      ...updatedTicketTypes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      ticketTypes: updatedTicketTypes
    }));
  };

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        {
          id: `ticket-${prev.ticketTypes.length + 1}`,
          name: '',
          description: '',
          price: 0,
          availableTickets: 0,
          benefits: [''],
        }
      ]
    }));
  };

  const removeTicketType = (index: number) => {
    if (formData.ticketTypes.length > 1) {
      const updatedTicketTypes = formData.ticketTypes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ticketTypes: updatedTicketTypes
      }));
    }
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (index: number) => {
    const updatedHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      highlights: updatedHighlights
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    const updatedHighlights = [...formData.highlights];
    updatedHighlights[index] = value;
    setFormData(prev => ({
      ...prev,
      highlights: updatedHighlights
    }));
  };

  const addTerm = () => {
    setFormData(prev => ({
      ...prev,
      terms: [...prev.terms, '']
    }));
  };

  const removeTerm = (index: number) => {
    const updatedTerms = formData.terms.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      terms: updatedTerms
    }));
  };

  const updateTerm = (index: number, value: string) => {
    const updatedTerms = [...formData.terms];
    updatedTerms[index] = value;
    setFormData(prev => ({
      ...prev,
      terms: updatedTerms
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Event created successfully!');
      router.push('/events');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Add New Event
            </h1>
            <p className="text-white/90 text-lg">
              Create and manage your events with EZTicket
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Event Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Event Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Event Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Short Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Brief description of your event"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Detailed Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => handleInputChange('longDescription', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Comprehensive description of your event"
                    rows={5}
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Event Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="e.g., Galle Face Green, Colombo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Time *</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="e.g., 3 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Organizer Name *</label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) => handleInputChange('organizer', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Your organization name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Contact Number</label>
                    <input
                      type="tel"
                      value={formData.organizerContact}
                      onChange={(e) => handleInputChange('organizerContact', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="+94 11 234 5678"
                    />
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Ticket Types</h2>
                  <button
                    type="button"
                    onClick={addTicketType}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
                  >
                    Add Ticket Type
                  </button>
                </div>
                
                {formData.ticketTypes.map((ticket, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Ticket Type {index + 1}</h3>
                      {formData.ticketTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicketType(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">Name *</label>
                        <input
                          type="text"
                          value={ticket.name}
                          onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                          placeholder="e.g., General Admission"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-semibold mb-2">Price (LKR) *</label>
                        <input
                          type="number"
                          value={ticket.price}
                          onChange={(e) => handleTicketTypeChange(index, 'price', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                          placeholder="2500"
                          min="0"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-semibold mb-2">Available Tickets *</label>
                        <input
                          type="number"
                          value={ticket.availableTickets}
                          onChange={(e) => handleTicketTypeChange(index, 'availableTickets', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                          placeholder="100"
                          min="1"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-semibold mb-2">Description</label>
                        <input
                          type="text"
                          value={ticket.description}
                          onChange={(e) => handleTicketTypeChange(index, 'description', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                          placeholder="What's included with this ticket"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event Highlights */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Event Highlights</h2>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
                  >
                    Add Highlight
                  </button>
                </div>
                
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Enter event highlight"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
                  <button
                    type="button"
                    onClick={addTerm}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
                  >
                    Add Term
                  </button>
                </div>
                
                {formData.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Enter term or condition"
                    />
                    <button
                      type="button"
                      onClick={() => removeTerm(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Event...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 