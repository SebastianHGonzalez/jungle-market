import React, { createContext } from 'react';

export interface ISession {
  name: string;
}

const initialValue: ISession = { name: '' };

const SessionContext = createContext(initialValue);

interface Props extends React.Props<any> {
  session: ISession;
}

export function SessionProvider({ session, children }: Props) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
