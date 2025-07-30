'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Clock, Users, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    // Redirect to auth page with email
    const authUrl = email ? `/auth?email=${encodeURIComponent(email)}` : '/auth';
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center gap-2 mb-8"
            >
              <ChefHat className="w-12 h-12 text-orange-600" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                RecipeAI
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Transform your ingredients into culinary masterpieces with the power of AI.
              Get personalized recipes instantly, no cooking experience required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-orange-200 rounded-full focus:outline-none focus:border-orange-400 transition-colors text-gray-900 placeholder-gray-500 bg-white"
              />
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 flex items-center gap-2 min-w-fit"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <a
                href="/generate"
                className="inline-flex items-center bg-white/80 backdrop-blur-sm text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-white transition-all transform hover:scale-105 border border-orange-200 shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Try Recipe Generator Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>10k+ Users</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RecipeAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI understands your preferences, dietary restrictions, and available ingredients to create perfect recipes just for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Generation',
                description: 'Advanced AI algorithms create unique recipes based on your ingredients and preferences.'
              },
              {
                icon: Clock,
                title: 'Instant Results',
                description: 'Get personalized recipes in seconds. No more browsing through endless recipe blogs.'
              },
              {
                icon: Star,
                title: 'Personalized Experience',
                description: 'Learns your taste preferences and dietary restrictions to improve suggestions over time.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all hover:shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of home cooks who&apos;ve discovered the magic of AI-powered recipes.
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105">
              Start Cooking Smarter Today
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold">RecipeAI</span>
            </div>
            <p className="text-gray-400">
              AI-powered recipe generation for the modern cook
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
