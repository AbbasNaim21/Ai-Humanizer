import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
            },
            success: {
              iconTheme: {
                primary: '#6366F1',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;