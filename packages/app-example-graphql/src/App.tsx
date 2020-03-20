import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RouterOutlet, routes } from './routes';

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
