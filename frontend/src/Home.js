import List from './List'
import Comment from './Comments'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


export default function Home(props) {

  return (
    <>
      <Button 
      	component={Link} 
      	to="/search" 
      	variant="contained" 
      	color="primary"
      	style={{
      		marginBottom: '5px',
      		marginTop: '10px'
      	}}
      >
  	Go Search
      </Button>
      <List />
      <Comment />
    </>
  )
}
