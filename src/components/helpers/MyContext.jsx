import React from 'react';

export const MyContext = React.createContext({})

export const MyContextProvider = props => {
  const [clientBalance, setClientBalance] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [dark, setDark] = React.useState(true);

  return (
    <MyContext.Provider
      value={[{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}]}
    >
      {props.children}
    </MyContext.Provider>
  );
};