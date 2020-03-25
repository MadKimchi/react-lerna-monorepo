// import React from 'react';

// import { InfiniteGrid } from '../infinite-grid';
// import { IndexRange } from 'react-virtualized';
// import { makeStyles } from '@material-ui/core';

// export default {
//   title: 'Components/InfiniteGrid',
//   component: InfiniteGrid
// };

// const useStyles = makeStyles({
//   tableCell: {},
//   flexContainer: {},
//   table: {}
// });

// /**
//  * This is an ongoing sample work done daily in my spare time
//  * It is not a production work, thus it has a few bugs.
//  */
// export const DefaultInfiniteGrid = () => {
//   const getRowsFromServer = ({ startIndex, stopIndex }: IndexRange) => {
//     return new Promise((resolve, reject) => {
//      fetch('http://localhost:5000/getData?start='+startIndex+'&end='+stopIndex)
//      .then(response => response.json())
//      .then(result => {
//       resolve(result)
//      })
//     })
//    }

//    const columns = [
//      {
//       dataKey: 'key',
//       label: 'keyLabel',
//       className: 'rowClassName',
//       width: 20
//      }
//    ];

//    const classes = useStyles();
//    const gridProps = {
//     classes,
//     width: 500,
//     columns,
//     onRowClick: () => {},
//     rowClassName: 'fasfaasdfs',
//     height: 500,
//     rowHeight: 20,
//     rowCount: 2,
//     getRowsFromServer
//    };

//   return (
//     <div>
//       <InfiniteGrid {...gridProps}/>
//     </div>
//   );
// };

// DefaultInfiniteGrid.story = {
//   title: 'Components/InfiniteGrid',
//   component: InfiniteGrid,
//   name: 'Infiinte Grid'
// };