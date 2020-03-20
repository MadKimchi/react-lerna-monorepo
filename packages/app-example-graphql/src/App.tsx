import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterOutlet from './routes/router-outlet';
import routes from './routes/routes';

const App = () => {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <RouterOutlet routes={routes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
