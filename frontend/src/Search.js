import React, { useState } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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

export default function Search() {
  const classes = useStyles();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    fetch(`/api/hardwarelist/`)
      .then(response => response.json())
      .then(data => {
        // filter the results based on the user's query
        const filteredResults = data.filter(hardware => {
          const regex = new RegExp(query, 'gi');
          return hardware.hardware_name.match(regex) || hardware.hardware_number.match(regex) || hardware.comment.match(regex);
        });
        setResults(filteredResults);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <TextField
        id="search-field"
        label="Search"
        value={query}
        onChange={handleQueryChange}
      />
     <Button 
 	variant="contained" 
 	color="primary" 
	onClick={handleSearch}
  	style={{ 
    		marginRight: '5px' 
  	}}	
    >
  	Search
    </Button>
    <Button 
  	component={Link} 
  	to="/" 
  	variant="contained" 
  	color="primary"
  	sx={{
	  ml: 2
  	}}	
    >
  	Go Home
    </Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Hardware Name</TableCell>
              <TableCell>Hardware Number</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(hardware => (
              <TableRow key={hardware.id}>
                <TableCell>{hardware.hardware_name}</TableCell>
                <TableCell>{hardware.hardware_number}</TableCell>
                <TableCell>{hardware.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


