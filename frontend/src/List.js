import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Box } from '@material-ui/core';
import { styled } from '@mui/system';
import Table from './Table.js';

const Container = styled(Box)({
  display: 'flex',
});

const ListContainer = styled(Box)({
  width: '20%',
  border: '1px solid black',
  padding: '10px',
  marginRight: '10px',
  overflowY: 'scroll',
  height: '400px',
});



export default function List(props) {
  const [faculties, setFaculties] = useState([]);
  const [cabinets, setCabinets] = useState({});
  const [selectedCabinet, setSelectedCabinet] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  useEffect(() => {
    axios.get('/api/facultylist/')
      .then(response => setFaculties(response.data));
  }, []);

  useEffect(() => {
    axios.get('/api/cabinetslist/')
      .then(response => {
        const groupedCabinets = {};
        response.data.forEach(cabinet => {
          const facultyId = cabinet.faculty;
          const faculty = faculties.find(f => f.id === facultyId);
          if (faculty) {
            const facultyName = faculty.name;
            if (!(facultyName in groupedCabinets)) {
              groupedCabinets[facultyName] = [];
            }
            groupedCabinets[facultyName].push(cabinet);
          }
        });
        setCabinets(groupedCabinets);
      });
  }, [faculties]);

  return (
    <Container>
      <ListContainer>
        {faculties.map(faculty => (
          <div key={faculty.id}>
            <Typography>
              {faculty.name}
            </Typography>
            {cabinets[faculty.name] &&
              cabinets[faculty.name].map(cabinet => (
                <Button
                  key={cabinet.id}
                  onClick={() => {
                    setSelectedCabinet(cabinet);
                    setSelectedFaculty(faculty);
                  }}
                >
                  {cabinet.cabinet}
                </Button>
              ))
            }
          </div>
        ))}
      </ListContainer>
        {selectedCabinet && (
          <Box>
            <Table
              cabinet={selectedCabinet}
              faculty={selectedFaculty}
            />
          </Box>
        )}
    </Container>
  );
}


