import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getProfile: (userId: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const navigate = useNavigate();

  const getProfile = useCallback(async (userId: string) => {
    if (!userId) {
      console.warn("getProfile called without userId.");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, credits, plan')
        .eq('id', userId)
        .single();

      if (error) {
        throw error; // Throw error to be caught by caller
      }
      return data;
    } catch (error: any) {
      toast.error(`Failed to load profile: ${error.message}`);
      console.error('Profile fetch error:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const initSession = async () => {
      console.log('Initializing session...');
      setLoading(true); // Start loading

      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session data:', session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        console.log('User found, fetching profile...');
        const fetchedProfile = await getProfile(session.user.id);
        console.log('Profile data:', fetchedProfile);
        setProfile(fetchedProfile);
      } else {
        console.log('No user found in session');
        setProfile(null);
      }
      setLoading(false); // End loading
    };

    // Important: Call initSession immediately to get initial state
    initSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setLoading(true); // Start loading for state changes
      console.log('Auth state changed:', _event, newSession); // Debug log

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const fetchedProfile = await getProfile(newSession.user.id);
        setProfile(fetchedProfile);
      } else {
        setProfile(null); // Clear profile if user signs out
      }
      setLoading(false); // End loading
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getProfile]); // getProfile is a dependency because it's called inside useEffect

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      const newUser = data.user;
      if (newUser) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: newUser.id, email: newUser.email, credits: 10, plan: 'free' }]);

        if (profileError) throw profileError;
        toast.success('Account created! Please check your email for verification.'); // Often email verification is needed
      }
      navigate('/login'); // Always redirect to login after signup
    } catch (error: any) {
      toast.error(error.message);
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      const currentSession = data.session;
      const currentUser = currentSession?.user;

      if (currentUser) {
        setSession(currentSession);
        setUser(currentUser);
        // Important: After sign-in, refetch profile to ensure latest data
        const fetchedProfile = await getProfile(currentUser.id);
        setProfile(fetchedProfile);
        toast.success('Signed in successfully!');
        navigate('/dashboard'); // Redirect to dashboard on successful sign-in
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true); // Start loading during sign out process
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // Clear all auth-related states immediately on successful signOut
      setSession(null);
      setUser(null);
      setProfile(null);
      toast.success('Signed out successfully!');
      navigate('/login'); // Navigate to login page
    } catch (error: any) {
      toast.error(`Failed to sign out: ${error.message}`);
      console.error('Sign out error:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};