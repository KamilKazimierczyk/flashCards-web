import React, { useState, createContext } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
