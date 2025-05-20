import TextHumanizer from '../components/TextHumanizer';
import { Link } from 'react-router-dom';
import { MoveRight, User, Award, Shield, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Make AI-Generated Text Sound Human
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 mb-8">
                  Transform robotic AI content into natural, engaging copy that connects with your audience.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/register" 
                    className="inline-flex items-center rounded-lg bg-white text-primary-700 px-6 py-3 text-base font-medium shadow-sm hover:bg-primary-50 transition-colors duration-150"
                  >
                    Get Started Free
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="inline-flex items-center rounded-lg bg-primary-700 text-white px-6 py-3 text-base font-medium shadow-sm hover:bg-primary-800 transition-colors duration-150"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg" 
                  alt="Person writing on laptop" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Our AI Text Humanizer</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Paste your AI-generated text below and watch as our tool transforms it into natural-sounding content.
              </p>
            </div>
            
            <TextHumanizer />
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Humanizer</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our advanced AI technology helps you create content that truly connects with your audience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-soft transition-all duration-300 hover:shadow-lg border border-gray-100">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Phrasing</h3>
                <p className="text-gray-600">
                  Eliminates robotic patterns and stiff language that give away AI-generated content.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-soft transition-all duration-300 hover:shadow-lg border border-gray-100">
                <div className="bg-secondary-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Maintains Message</h3>
                <p className="text-gray-600">
                  Preserves your original meaning while making the language more conversational and engaging.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-soft transition-all duration-300 hover:shadow-lg border border-gray-100">
                <div className="bg-accent-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Detection Defense</h3>
                <p className="text-gray-600">
                  Helps your content pass AI detection tools by making it indistinguishable from human writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of writers, students, and professionals who trust our humanizer.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "As a content creator, this tool is a game-changer. I use AI to draft content but always had to spend hours making it sound more natural. Now it's just one click!"
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Sarah Johnson</h4>
                    <p className="text-gray-500">Content Marketer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "I'm a student who uses AI for research paper drafts. This humanizer helps me avoid plagiarism concerns while still saving me tons of time on writing."
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-gray-500">Graduate Student</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Our agency uses this tool for all client content. We can quickly create drafts with AI, then humanize them before sending to clients. They never know the difference!"
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Alex Rodriguez</h4>
                    <p className="text-gray-500">Agency Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Make Your AI Text Sound Human?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of writers who have improved their content with our AI Text Humanizer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/register" 
                className="inline-flex items-center rounded-lg bg-white text-primary-700 px-6 py-3 text-base font-medium shadow-sm hover:bg-primary-50 transition-colors duration-150"
              >
                Get Started Free
                <Check className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/pricing" 
                className="inline-flex items-center rounded-lg bg-primary-700 text-white px-6 py-3 text-base font-medium shadow-sm hover:bg-primary-800 transition-colors duration-150"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}