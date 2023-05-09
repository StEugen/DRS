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

  const [hardwareList, setHardwareList] = useState([]);

  useEffect(() => {
    fetch('/api/hardwarelist/')
      .then(response => response.json())
      .then(data => setHardwareList(data))
      .catch(error => console.error(error));
  }, []);

  const filteredHardwareList = hardwareList.filter(hardware => hardware.cabinet === cabinet.id);

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
            <TableCell>Additional info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredHardwareList.map(hardware => (
            <TableRow key={hardware.id}>
              <TableCell>{hardware.hardware_name}</TableCell>
              <TableCell>{hardware.hardware_number}</TableCell>
              <TableCell>{hardware.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

