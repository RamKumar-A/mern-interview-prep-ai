import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setLoading(false);
      return;
    }
    async function fetchUser() {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (err) {
        console.error('User note authenticated', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user]);

  function updateUser(userData) {
    setUser(userData);
    localStorage.setItem('token', userData.token); //Svae token
    setLoading(false);
  }

  function clearUser() {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        loading,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
