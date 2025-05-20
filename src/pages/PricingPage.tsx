import PricingCard from '../components/PricingCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';

export default function PricingPage() {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out our service',
      features: [
        '10 text humanizing credits',
        'Basic humanization features',
        'Limited to 1,000 characters per text',
        'Standard processing speed',
        'Results stored for 7 days'
      ],
      credits: 10
    },
    {
      name: 'Pro',
      price: '$9.99',
      description: 'For professionals and regular users',
      features: [
        '100 text humanizing credits per month',
        'Advanced humanization algorithms',
        'Up to 5,000 characters per text',
        'Priority processing speed',
        'Results stored for 30 days',
        'Email support'
      ],
      credits: 100,
      highlighted: true
    },
    {
      name: 'Premium',
      price: '$29.99',
      description: 'For teams and high-volume needs',
      features: [
        'Unlimited text humanizing',
        'Premium humanization quality',
        'No character limits',
        'Fastest processing priority',
        'Results stored indefinitely',
        'Priority email & chat support',
        'API access'
      ],
      credits: -1 // Unlimited
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Choose the plan that's right for you. All plans include access to our AI Text Humanizer tool.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, i) => (
                <PricingCard key={i} tier={tier} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our service? Find answers to common questions below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">What is a humanizing credit?</h3>
                <p className="text-gray-600">
                  A humanizing credit allows you to process one piece of text through our AI humanizer. Each submission counts as one credit, regardless of length (up to the character limits of your plan).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Do credits roll over?</h3>
                <p className="text-gray-600">
                  No, credits for paid plans reset at the beginning of each billing cycle. Free plan credits don't expire as long as your account is active.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Can I change plans?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Is there a refund policy?</h3>
                <p className="text-gray-600">
                  We offer a 7-day money-back guarantee for new subscriptions. If you're not satisfied, contact us within 7 days of your purchase for a full refund.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">How secure is my content?</h3>
                <p className="text-gray-600">
                  We take security seriously. Your content is encrypted in transit and at rest. We don't use your content to train our models without explicit permission.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Do you offer team plans?</h3>
                <p className="text-gray-600">
                  Yes, contact us for custom team plans with multiple seats and shared credit pools for your organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">100% Satisfaction Guarantee</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Try our service risk-free. If you're not completely satisfied, we'll refund your payment.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">7-day money-back guarantee</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">No questions asked refunds</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">Cancel anytime with no fees</p>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg" 
                    alt="Happy customers" 
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}