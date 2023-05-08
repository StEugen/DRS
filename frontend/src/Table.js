import React, { useState, useEffect } from "react";
import { Table as MuiTable, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  table: {
    minWidth: 650,
    alignItems: 'center',
    justifyContent: 'center'
  },
}));


export default function Table({ cabinet, faculty }) {
  const classes = useStyles();
  return (
    <TableContainer 
      component={Paper}
      className={classes.tableContainer} 
    >
      <MuiTable aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{faculty.name}</TableCell>
            <TableCell>{cabinet.cabinet}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
