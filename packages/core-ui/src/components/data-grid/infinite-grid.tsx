import React, { FunctionComponent, useState, useEffect, ReactElement } from 'react';
import {
    InfiniteLoader,
    Index,
    IndexRange,
    Table,
    Column,
    TableCellProps,
    AutoSizer
} from 'react-virtualized';
import { TableCell, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';

export interface IColumn {
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
    // className?: string;
}

export interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  }

export interface IInfiniteGridProps {
    columns: IColumn[];
    // classes: { [key: string]: any };
    width: number;
    height: number;
    rowHeight: number;
    rowCount: number;
    rowClassName: string;
    headerHeight?: number;
    rowGetter?: (row: Index) => Data;
    getRowsFromServer: (indexRange: IndexRange) => Promise<any>;
    onRowClick?: () => void;
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
  

export const InfiniteGrid: FunctionComponent<IInfiniteGridProps> = ({
    // classes,
    width,
    columns,
    onRowClick,
    rowClassName,
    height,
    rowHeight = 48,
    headerHeight = 48,
    rowCount,
    getRowsFromServer
}) => {
    const [data, setData] = useState<any>([]);
    const classes = useStyles();
    
    function isRowLoaded({ index } : Index): boolean {
        return !!data[index];
    }

    function loadMoreRows({ startIndex, stopIndex }: IndexRange): Promise<any> {
        console.log(startIndex, stopIndex);
        return getRowsFromServer({startIndex, stopIndex})
            .then((result) => {
                var tempData = [...data, ...result];
                setData(tempData);
            })
        // return new Promise<T>(() => {});
    }

    function getRowClassName({ index }: Index) {
        return `${classes.tableRow} ${classes.tableRowHover} ${classes.flexContainer} ${rowClassName}${index}`;
    }

    function cellRenderer(cellProps: TableCellProps): ReactElement {
        return (
         <TableCell
            component="div"
            variant="body"
            className={`${classes.tableCell} ${classes.flexContainer}`}
            style={{ height: rowHeight }} >
            {cellProps.cellData}
         </TableCell>
        )
    }

    function headerRenderer(cellProps: TableCellProps): ReactElement {
        // console.log('headerCell ', cellProps);
        return (
            <TableCell
                component="div"
                className={`${classes.tableCell} ${classes.flexContainer}`}
                variant="head"
            >
                {cellProps.dataKey.toUpperCase()}
            </TableCell>
        );
    }
    
    useEffect(() => {
        loadMoreRows({startIndex: 0, stopIndex: 7});
    }, []);

    return (
        <Paper style={{height: 288, width: '100%'}}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={rowCount} >
                        {
                            ({ onRowsRendered, registerChild }) => (
                                <Table
                                    ref={registerChild}
                                    className={classes.table}
                                    rowHeight={rowHeight}
                                    rowCount={data.length}
                                    width={width}
                                    height={height}
                                    headerHeight={headerHeight}
                                    rowGetter={({ index }) => data[index]}
                                    onRowsRendered={onRowsRendered}
                                    rowClassName={getRowClassName} >
                                    {columns.map((col: IColumn) => {
                                        return (
                                            <Column
                                                key={col.dataKey}
                                                label={col.label}
                                                dataKey={col.dataKey}
                                                headerRenderer={headerRenderer}
                                                className={`${classes.flexContainer}`}
                                                cellRenderer={cellRenderer}
                                                width={col.width}
                                            />
                                        ) 
                                    })}
                                </Table>
                            )
                        }
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </Paper>
    );
};