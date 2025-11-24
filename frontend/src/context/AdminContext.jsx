import React, { createContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Load admin data from local storage
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      setAdmin(JSON.parse(storedAdminData));
    }
  }, []);
  
  const value = {
    admin,
    setAdmin,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
