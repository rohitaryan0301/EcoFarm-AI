import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock persistent login
    const savedUser = localStorage.getItem('eco_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (identifier, password) => {
    // Mock login logic with roles
    let mockUser;
    if (identifier === 'admin@ecofarm.com') {
      mockUser = { id: 'admin', name: 'System Admin', email: identifier, role: 'admin' };
    } else {
      // Use the identifier (email/phone) as the name for demo purposes
      const name = identifier.split('@')[0].charAt(0).toUpperCase() + identifier.split('@')[0].slice(1);
      mockUser = { id: '1', name: name || 'Kisan Bhai', email: identifier, phone: '9876543210', role: 'user' };
    }
    setUser(mockUser);
    localStorage.setItem('eco_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (userData) => {
    // Mock signup logic
    const mockUser = { id: Date.now().toString(), ...userData, role: 'user' };
    setUser(mockUser);
    localStorage.setItem('eco_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
