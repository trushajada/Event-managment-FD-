import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (credentials) => {
    const response = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    return data;
  };
  
  const logout = () => {
    localStorage.removeItem('data'); 
    setUser(null);
  };

 
  
  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.userData);  
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

