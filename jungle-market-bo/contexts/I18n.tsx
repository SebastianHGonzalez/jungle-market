import React, { createContext } from 'react';

export interface Messages {
  [key: string]: string;
}

interface I18nContextValue {
  lang: string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'es-AR',
  messages: {},
});

export function I18nProvider({
  lang,
  messages,
  children,
}: React.Props<any> & I18nContextValue) {
  return (
    <I18nContext.Provider value={{ lang, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export default I18nContext;
