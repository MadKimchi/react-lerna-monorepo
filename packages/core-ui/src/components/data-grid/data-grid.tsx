import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';

import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
  InfiniteLoader,
  Index,
  IndexRange
} from 'react-virtualized';
import { Paper } from '@material-ui/core';

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

interface Row {
  index: number;
}

const columnss= [
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

export interface IDataGridProps {
  id: string;
  // data: Promise<any>;
  // onRowClicked: () => void;
  // onPayloadChange: () => void;
  // rowComponent: ComponentType<any>;
  // header: ComponentType<any>;
  // columns: any[];

  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter?: (row: Row) => Data;
  rowHeight?: number;
  getRowsFromServer: (indexRange: IndexRange) => Promise<any>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined
    }
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
}))

export const DataGrid: FunctionComponent<IDataGridProps> = ({
  headerHeight = 48,
  rowHeight = 48,
  getRowsFromServer,
  // rowGetter = ({ index }) => rows[index],
  rowCount = 5,
  columns = columnss,
  onRowClick,
  ...tableProps
}): ReactElement => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [data, setData] = useState<any>([]);
    console.log(data);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log(emptyRows);
    const [rowIndex, setRowIndex] = useState(0); 

    useEffect(() => {
      loadMoreRows({startIndex: 0, stopIndex: 1});
    }, []);



    function rowGetter({ index }: Index) {
      return data[index];
    }

    const cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {

      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null
          })}
          variant="body"
          style={{ height: rowHeight }}
          align={
            (columnIndex != null && columns[columnIndex].numeric) || false
              ? "right"
              : "left"
          }
        >
          {cellData}
        </TableCell>
      );
    };

    const headerRenderer = ({
      label,
      columnIndex
    }: TableHeaderProps & { columnIndex: number }) => {
  
      return (
        <TableCell
          component="div"
          className={clsx(
            classes.tableCell,
            classes.flexContainer,
            classes.noClick
          )}
          variant="head"
          style={{ height: headerHeight }}
          align={columns[columnIndex].numeric || false ? "right" : "left"}
        >
          <span>{label}</span>
        </TableCell>
      );
    };
    function setIndex(index: number): void {
      setRowIndex(index);
    }
  
    const getRowClassName = (row: Row) => {
      const {index} = row
      console.log(index);
      console.log(rowCount);
      console.log(rowGetter(row));
      setIndex(index);
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null
      });
    };

    function isRowLoaded({ index } : Index): boolean {
      return !!data[index];
    }

    function loadMoreRows({ startIndex, stopIndex }: IndexRange): Promise<any> {
        return getRowsFromServer({startIndex, stopIndex})
            .then((result) => {
                var tempData = [...data, ...result];
                setData(tempData);
            })
        // return new Promise<T>(() => {});
    }

    return (
      <Paper style={{height: 100, width: '100%'}}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount} >
              {
                ({ onRowsRendered, registerChild }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={rowHeight!}
                    gridStyle={{
                      direction: "inherit"
                    }}
                    ref={registerChild}
                    headerHeight={headerHeight!}
                    className={classes.table}
                    rowGetter={rowGetter}
                    rowCount={rowCount}
                    onRowsRendered={onRowsRendered}
                    rowClassName={getRowClassName}>
                    {columns.map(({ dataKey, ...other }, index) => {
                      return (
                        <Column
                          key={dataKey}
                          headerRenderer={(headerProps: any) =>
                            headerRenderer({
                              ...headerProps,
                              columnIndex: index
                            })
                          }
                          className={classes.flexContainer}
                          cellRenderer={cellRenderer}
                          dataKey={dataKey}
                          {...other}
                        />
                      );
                    })}

                  </Table>
                )}
            </InfiniteLoader>
             )}
          </AutoSizer>
      </Paper>
    );
};

// https://codesandbox.io/s/material-demo-edfz4

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }
