import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserHistory } from '../services/textService';
import TextHistoryItem from '../components/TextHistoryItem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
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
  const { user, profile, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;
      
      try {
        setHistoryLoading(true);
        const data = await getUserHistory(user.id);
        setHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading history:', error);
        toast.error('Failed to load your history.');
      } finally {
        setHistoryLoading(false);
      }
    };

    if (user && !authLoading) {
      loadHistory();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size={40} className="text-primary-500 mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size={40} className="text-primary-500 mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.email?.split('@')[0]}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your account and view your humanized text history.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Plan</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {profile.plan} Plan
                    </p>
                  </div>
                </div>
                {profile.plan !== 'premium' && (
                  <Link
                    to="/pricing"
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
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
                      {profile.plan === 'premium' ? 'Unlimited' : profile.credits}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Text History</h2>
            {historyLoading ? (
              <div className="text-center py-8">
                <LoadingSpinner size={32} className="text-primary-500 mb-3" />
                <p className="text-gray-600">Loading your history...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item) => (
                  <TextHistoryItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No history found yet. Start humanizing some text!</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Try Humanizing Text
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}