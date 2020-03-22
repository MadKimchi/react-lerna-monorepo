import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import RouterOutlet from './routes/router-outlet';
import routes from './routes/routes';
import { GlobalContext } from './core/contexts/global.context';

const App = () => {
  const { service } = useContext(GlobalContext);

  useEffect(() => {
    console.log('rendered...');
  }, [service.updateValue]);

  return (
    <div className="appContainer">
      <BrowserRouter>
        <button>
          <Link to="/dashboard">About</Link>
        </button>
        <button>
          <Link to="/login">About</Link>
        </button>
        <RouterOutlet routes={routes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
