import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Cookies from 'js-cookie';

export default function useUser() {
  const [user, setUser] = useContext(UserContext);

  const login = (userData) => {
    setUser({
      ...userData,
      loggedIn: true,
    });

    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ loggedIn: false });
    localStorage.removeItem('userData');
    Cookies.remove('jwt');
  };

  return {
    user,
    login,
    logout,
  };
}
