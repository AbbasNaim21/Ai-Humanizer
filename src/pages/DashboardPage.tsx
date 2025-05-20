import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserHistory } from '../services/textService';
import TextHistoryItem from '../components/TextHistoryItem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Award, FileText, MoveUp } from 'lucide-react';
import toast from 'react-hot-toast';

type HistoryItem = {
  id: string;
  created_at: string;
  original_text: string;
  humanized_text: string;
};

export default function DashboardPage() {
  const { user, profile, loading: authLoading, getProfile } = useAuth(); // Destructure getProfile
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true); // Separate loading state for history
  const navigate = useNavigate();

  // Effect to fetch profile if not already available
  useEffect(() => {
    // Only fetch profile if user exists, profile is null, and auth is not loading
    if (user && !profile && !authLoading) {
      console.log("Dashboard: Fetching profile for user:", user.id); // Debug log
      getProfile(user.id);
    }
  }, [user, profile, authLoading, getProfile]); // Add getProfile to dependencies

  // Effect to load user history
  useEffect(() => {
    const loadHistory = async () => {
      // Only load history if user exists and auth is not loading (means user is ready)
      if (user && !authLoading) {
        try {
          setHistoryLoading(true); // Start history loading
          const data = await getUserHistory(user.id);
          setHistory(Array.isArray(data) ? data : []);
          console.log("Dashboard: History loaded", data); // Debug log
        } catch (error) {
          console.error('Error loading history:', error);
          toast.error('Failed to load your history.');
        } finally {
          setHistoryLoading(false); // End history loading
        }
      } else if (!user && !authLoading) {
          // If auth is not loading but there's no user, it means user is not authenticated.
          // This case should ideally be handled by a ProtectedRoute, but good to log/redirect here too.
          console.log("Dashboard: No user found, redirecting to login.");
          // navigate('/login'); // Potentially redirect if no user
      }
    };

    loadHistory(); // Call the async function directly
  }, [user, authLoading]); // Dependencies: user and authLoading

  // Conditional rendering based on overall authentication loading state
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading authentication...</div>;
  }

  // If not loading and no user, redirect (this should ideally be handled by a router guard)
  if (!user) {
    navigate('/login'); // If user is suddenly null, redirect to login
    return null; // Don't render anything while redirecting
  }

  // If user exists but profile is still null after authLoading, means profile fetch failed or still in progress.
  // This helps catch cases where getProfile fails without crashing.
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading user profile...</div>;
  }

  const getPlanName = (plan: string) => {
    const cleanPlan = plan?.toLowerCase().trim();
    switch (cleanPlan) {
      case 'free': return 'Free Plan';
      case 'pro': return 'Pro Plan';
      case 'premium': return 'Premium Plan';
      default: return 'Unknown Plan';
    }
  };

  const getCreditsDisplay = (credits: number, plan: string) => {
    return plan === 'premium' ? 'Unlimited' : credits;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.email?.split('@')[0]}</h1>
            <p className="mt-2 text-lg text-gray-600">Manage your account and view your humanized text history.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Plan</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {getPlanName(profile?.plan)}
                    </p>
                  </div>
                </div>
                {profile?.plan !== 'premium' && (
                  <Link to="/pricing" className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
                    Upgrade Plan
                    <MoveUp className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Available Credits</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {profile?.credits !== undefined && profile?.credits !== null
                        ? getCreditsDisplay(profile.credits, profile.plan)
                        : '...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Render History */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Text History</h2>
            {historyLoading ? (
              <p className="text-gray-500">Loading history...</p>
            ) : history.length > 0 ? (
              history.map((item) => <TextHistoryItem key={item.id} item={item} />)
            ) : (
              <p className="text-gray-500">No history found yet. Start humanizing some text!</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}