import AIRecommendations from '../components/AIRecommendations';
import Navbar from '../components/Navbar';

export default function AIFeatures() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Features
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Experience the future of event management with our intelligent AI features
          </p>
        </div>
        
        <AIRecommendations />
      </div>
    </div>
  );
} 