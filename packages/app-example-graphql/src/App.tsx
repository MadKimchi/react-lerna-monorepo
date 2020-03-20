import React from 'react';
import { useQuery } from 'react-apollo';

import { CURRENCY_QUERY } from './core/https/graph/queries';

const App = () => {
  const { data, error, loading } = useQuery(CURRENCY_QUERY);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {
        data.rates.map((rate: any) => <div key={rate.currency}>{rate.rate}</div>)
      }
    </div>
  );
}

export default App;
