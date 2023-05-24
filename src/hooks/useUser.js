import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function useUser() {
  const [user, setUser] = useContext(UserContext);

  const login = (userData) => {
    setUser({
      ...userData,
      loggedIn: true,
    });
  };

  const logout = () => {
    setUser({ loggedIn: false });
  };

  return {
    user,
    login,
    logout,
  };
}
