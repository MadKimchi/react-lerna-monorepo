import React, { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import RouterOutlet from './routes/router-outlet';
import routes from './routes/routes';

const App: FunctionComponent = (): ReactElement => {
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
