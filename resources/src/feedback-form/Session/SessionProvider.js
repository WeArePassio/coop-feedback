
import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

export const SessionContext = createContext();
const SessionProvider = ({children}) => {
  return (
    <SessionContext.Provider
      value={{
      }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export {SessionProvider, useSession};