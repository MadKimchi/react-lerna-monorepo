import React, { useContext } from 'react';
import './App.css';
import { AppProvider } from './core/contexts';
import { GlobalContext } from './core/contexts/global.context';

const App = () => {
  const globalContext = useContext(GlobalContext);
  console.log(globalContext);
  return (
    <AppProvider>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    </AppProvider>
  );
}

export default App;
