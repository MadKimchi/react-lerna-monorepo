// import React from 'react';

// import { DataGrid, Data } from '../data-grid';
// import { IndexRange } from 'react-virtualized';

// export default {
//   title: 'Components/DataGrid',
//   component: DataGrid
// };

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];


// export const DefaultDataGrid = () => {
//   function getRowsFromServer({startIndex, stopIndex}: IndexRange): Promise<Data[]> {
//     return new Promise((resolve, reject) => {
//       if (startIndex === 0) {
//         return resolve([
//           createData('Cupcake', 305, 3.7, 67, 4.3),
//           createData('Donut', 452, 25.0, 51, 4.9),
//           createData('Eclair', 262, 16.0, 24, 6.0),
//           createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//           createData('Gingerbread', 356, 16.0, 49, 3.9),        
//         ]);
//       }

//       return resolve([
//         createData('Honeycomb', 408, 3.2, 87, 6.5),
//         createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//         createData('Jelly Bean', 375, 0.0, 94, 0.0),
//         createData('KitKat', 518, 26.0, 65, 7.0),
//         createData('Lollipop', 392, 0.2, 98, 0.0),
//       ]);
//     })
//    }

//    const columns= [
//     {
//       width: 200,
//       label: "Dessert",
//       dataKey: "dessert"
//     },
//     {
//       width: 120,
//       label: "Calories\u00A0(g)",
//       dataKey: "calories",
//       numeric: true
//     },
//     {
//       width: 120,
//       label: "Fat\u00A0(g)",
//       dataKey: "fat",
//       numeric: true
//     },
//     {
//       width: 120,
//       label: "Carbs\u00A0(g)",
//       dataKey: "carbs",
//       numeric: true
//     },
//     {
//       width: 120,
//       label: "Protein\u00A0(g)",
//       dataKey: "protein",
//       numeric: true
//     }
//   ];

//   return (
//     <div>
//       <DataGrid
//         id="exampleGrid"
//         rowCount={5}
//         columns={columns}
//         getRowsFromServer={getRowsFromServer}/>
//     </div>
//   );
// };

// DefaultDataGrid.story = {
//   title: 'Components/DataGrid',
//   component: DataGrid,
//   name: 'Default DataGrid'
// };


import React from 'react';

import { DataGrid, Data } from '../data-grid';
import { InfiniteGrid } from '../infinite-grid';
import { IndexRange } from 'react-virtualized';
import { makeStyles } from '@material-ui/core';

export default {
  title: 'Components/InfiniteGrid',
  component: InfiniteGrid
};

const useStyles = makeStyles({
  tableCell: {},
  flexContainer: {},
  table: {}
});


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return { name, calories, fat, carbs, protein };
}

/**
 * This is an ongoing sample work done daily in my spare time
 * It is not a production work, thus it has a few bugs.
 */
export const DefaultInfiniteGrid = () => {
  const getRowsFromServer = ({ startIndex, stopIndex }: IndexRange) => {
    console.log('called');
    console.log(startIndex, stopIndex);
    return new Promise((resolve, reject) => {
      if (startIndex === 0) {
        return resolve([
          createData('Cupcake', 305, 3.7, 67, 4.3),
          createData('Donut', 452, 25.0, 51, 4.9),
          createData('Eclair', 262, 16.0, 24, 6.0),
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData('Gingerbread', 356, 16.0, 49, 3.9),
          createData('Honeycomb', 408, 3.2, 87, 6.5),
          createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
          createData('Jelly Bean', 375, 0.0, 94, 0.0)
        ]);
      }

      return resolve([
        createData('KitKat', 518, 26.0, 65, 7.0),
        createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0),
        createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
      ]);
    })
   }

   const columns = [
    {
      width: 200,
      label: "Dessert",
      dataKey: "dessert"
    },
    {
      width: 120,
      label: "Calories\u00A0(g)",
      dataKey: "calories",
      numeric: true
    },
    {
      width: 120,
      label: "Fat\u00A0(g)",
      dataKey: "fat",
      numeric: true
    },
    {
      width: 120,
      label: "Carbs\u00A0(g)",
      dataKey: "carbs",
      numeric: true
    },
    {
      width: 120,
      label: "Protein\u00A0(g)",
      dataKey: "protein",
      numeric: true
    }
   ];

   const classes = useStyles();
   const gridProps = {
    classes,
    width: 500,
    columns,
    onRowClick: () => {},
    rowClassName: 'fasfaasdfs',
    height: 240,
    rowHeight: 48,
    rowCount: 50,
    getRowsFromServer
   };

  return (
    <div>
      <InfiniteGrid {...gridProps}/>
    </div>
  );
};

DefaultInfiniteGrid.story = {
  title: 'Components/InfiniteGrid',
  component: InfiniteGrid,
  name: 'Infiinte Grid'
};