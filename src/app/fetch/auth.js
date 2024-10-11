
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token,logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);