import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { upgradeUserPlan } from '../services/textService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lock, CreditCard, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');
  const { user, profile, getProfile } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(planParam || 'pro');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const plans = {
    pro: {
      name: 'Pro Plan',
      price: '$9.99',
      credits: 100,
      features: [
        '100 monthly credits',
        'Up to 5,000 characters per text',
        'Priority processing',
        'Results stored for 30 days',
      ],
    },
    premium: {
      name: 'Premium Plan',
      price: '$29.99',
      credits: -1, // Unlimited
      features: [
        'Unlimited text humanizing',
        'No character limits',
        'Fastest processing priority',
        'Results stored indefinitely',
        'Priority support',
        'API access',
      ],
    },
  };
  
  useEffect(() => {
    if (planParam && (planParam === 'pro' || planParam === 'premium')) {
      setSelectedPlan(planParam);
    }
  }, [planParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + ' ';
    }
    
    return formatted.trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Limit to 16 digits
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setCardInfo({
      ...cardInfo,
      cardNumber: formatCardNumber(digits),
    });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Remove non-digit characters
    let digits = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    digits = digits.slice(0, 4);
    
    let formatted = '';
    if (digits.length > 2) {
      formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    } else {
      formatted = digits;
    }
    
    setCardInfo({
      ...cardInfo,
      expiryDate: formatted,
    });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Limit to 3-4 digits
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setCardInfo({
      ...cardInfo,
      cvv: digits,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to upgrade your plan');
      navigate('/login');
      return;
    }
    
    // Validate form
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
      toast.error('Please fill out all card details');
      return;
    }
    
    setLoading(true);
    
    // Mock payment processing
    setTimeout(async () => {
      // Update user plan in Supabase
      const plan = selectedPlan;
      const credits = plan === 'premium' ? -1 : 100;
      
      const success = await upgradeUserPlan(user.id, plan, credits);
      
      if (success) {
        await getProfile();
        toast.success(`Successfully upgraded to ${plans[selectedPlan as keyof typeof plans].name}!`);
        navigate('/dashboard');
      } else {
        toast.error('Failed to upgrade plan. Please try again.');
      }
      
      setLoading(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to upgrade your plan
            </h2>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Log In
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getPlanCardClasses = (plan: string) => {
    return `border rounded-lg p-6 cursor-pointer ${
      selectedPlan === plan
        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
        : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-primary-500 text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">1. Select Your Plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div 
                  className={getPlanCardClasses('pro')}
                  onClick={() => setSelectedPlan('pro')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Pro Plan</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-2">$9.99 <span className="text-sm font-normal text-gray-500">/month</span></p>
                    </div>
                    {selectedPlan === 'pro' && (
                      <div className="bg-primary-500 rounded-full p-1">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {plans.pro.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div 
                  className={getPlanCardClasses('premium')}
                  onClick={() => setSelectedPlan('premium')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Premium Plan</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-2">$29.99 <span className="text-sm font-normal text-gray-500">/month</span></p>
                    </div>
                    {selectedPlan === 'premium' && (
                      <div className="bg-primary-500 rounded-full p-1">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {plans.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-6">2. Payment Information</h2>
              
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Credit or Debit Card</h3>
                  <div className="flex space-x-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-8" />
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="cardNumber"
                          id="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        id="cardName"
                        value={cardInfo.cardName}
                        onChange={handleInputChange}
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          id="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleExpiryDateChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="text"
                            name="cvv"
                            id="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCvvChange}
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="123"
                            required
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h4>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">{plans[selectedPlan as keyof typeof plans].name}</span>
                        <span className="text-sm text-gray-900">{plans[selectedPlan as keyof typeof plans].price}/month</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <span className="text-base font-medium text-gray-900">{plans[selectedPlan as keyof typeof plans].price}/month</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full inline-flex justify-center items-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        loading ? 'opacity-75 cursor-wait' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Purchase'
                      )}
                    </button>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      By completing this purchase, you agree to our{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-500">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-500">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}