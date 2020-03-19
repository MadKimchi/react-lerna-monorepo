import React from 'react';

import { DataGrid } from '../data-grid';

export default {
  title: 'Components/DataGrid',
  component: DataGrid
};

/**
 * This is an ongoing sample work done daily in my spare time
 * It is not a production work, thus it has a few bugs.
 */
export const DefaultDataGrid = () => {
  return (
    <div>
      <DataGrid />
    </div>
  );
};

DefaultDataGrid.story = {
  title: 'Components/DataGrid',
  component: DataGrid,
  name: 'Default DataGrid'
};
