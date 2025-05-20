import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  credits: number;
  highlighted?: boolean;
};

type PricingCardProps = {
  tier: PricingTier;
};

export default function PricingCard({ tier }: PricingCardProps) {
  const { user, profile } = useAuth();
  
  const getButtonLabel = () => {
    if (!user) return 'Sign Up';
    if (profile?.plan === tier.name.toLowerCase()) return 'Current Plan';
    return 'Upgrade';
  };
  
  const getButtonLink = () => {
    if (!user) return '/register';
    if (profile?.plan === tier.name.toLowerCase()) return '/dashboard';
    return `/payment?plan=${tier.name.toLowerCase()}`;
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${
      tier.highlighted 
        ? 'border-2 border-primary-500 transform scale-105 z-10' 
        : 'border border-gray-200'
    }`}>
      {tier.highlighted && (
        <div className="bg-primary-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
        <div className="flex items-baseline text-gray-900 mb-2">
          <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
          {tier.name !== 'Free' && <span className="ml-1 text-gray-500">/month</span>}
        </div>
        <p className="text-gray-500 mb-6">{tier.description}</p>
        <Link
          to={getButtonLink()}
          className={`block w-full px-4 py-2 rounded-md shadow-sm text-center text-sm font-medium ${
            tier.highlighted 
              ? 'bg-primary-500 hover:bg-primary-600 text-white' 
              : profile?.plan === tier.name.toLowerCase()
                ? 'bg-gray-100 text-gray-800 cursor-default'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors duration-150`}
        >
          {getButtonLabel()}
        </Link>
      </div>
      <div className="px-6 pt-4 pb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">What's included:</h4>
        <ul className="space-y-3">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-sm text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}