import React from 'react';

export const MyContext = React.createContext({})

export const MyContextProvider = props => {
  const [clientBalance, setClientBalance] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  return (
    <MyContext.Provider
      value={[{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}]}
    >
      {props.children}
    </MyContext.Provider>
  );
};