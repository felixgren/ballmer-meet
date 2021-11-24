// @ts-nocheck

import React, { useContext, useState } from 'react';
import BowserSession from '@/components/utils/BowserSession';

export const BowserContext = React.createContext();
export const BowserUpdateContext = React.createContext();

export function useBowser() {
  return useContext(BowserContext);
}

export function useBowserUpdate() {
  return useContext(BowserUpdateContext);
}

// BowserSession is the state saved in SessionStorage to retain current state on page reload.
// It is used as default value for bowserState, and updated along with it inside setStates function.
export function BowserProvider({ children }) {
  const [bowserState, setBowserState] = useState(BowserSession());

  function setStates(boolean) {
    setBowserState(boolean);
    BowserSession(boolean);
  }
  return (
    <BowserContext.Provider value={bowserState}>
      <BowserUpdateContext.Provider value={setStates}>
        {children}
      </BowserUpdateContext.Provider>
    </BowserContext.Provider>
  );
}
