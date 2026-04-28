import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FarmProvider } from './context/FarmContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ChatbotWidget from './components/ChatbotWidget';
import Dashboard from './pages/Dashboard';
import CropPrediction from './pages/CropPrediction';
import DailyAdvisor from './pages/DailyAdvisor';
import FarmProfile from './pages/FarmProfile';
import Chatbot from './pages/Chatbot';
import FarmingGuide from './pages/FarmingGuide';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import { useAuth } from './context/AuthContext';

// Separate component for protected routes
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

// Separate component so useLocation can be used inside BrowserRouter
function AppLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isChatbotPage = pathname === '/chatbot';
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 transition-colors duration-500">
      {/* Horizontal Navbar */}
      {!isAuthPage && <Navbar />}

      {/* Main content area */}
      <div className={!isAuthPage ? (pathname === '/' && !user ? "pt-20" : "pt-24 lg:pt-32 pb-12") : ""}>
        <div className={pathname === '/' && !user ? "" : "main-content"}>
          {/* Page routes */}
          <Routes>
            {/* Public Root: Shows LandingPage if not logged in, Dashboard if logged in */}
            <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="/login"   element={<Login />} />
            <Route path="/signup"  element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/crop"    element={<ProtectedRoute><CropPrediction /></ProtectedRoute>} />
            <Route path="/advisor" element={<ProtectedRoute><DailyAdvisor /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><FarmProfile /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            <Route path="/guide"   element={<ProtectedRoute><FarmingGuide /></ProtectedRoute>} />
            <Route path="/about"   element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/admin"   element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      {/* Floating chatbot widget – hidden on the full chatbot page or auth pages */}
      {!isChatbotPage && !isAuthPage && user && <ChatbotWidget />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FarmProvider>
          <AppLayout />
        </FarmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
