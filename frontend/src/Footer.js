import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";



function Copyright() {
  return (
    <Typography variant="body2">
      {'©'}
      <Link color="inherit" href="https://github.com/StEugen">
        Made by StEugen {new Date().getFullYear()}
      </Link>
    </Typography>
  );
}

export default function Footer(props) {
    return (
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 1,
            mt: 'auto',
            textAlign: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container >
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  DRS
                </Typography>
                <Typography variant='body1'>
                  <Copyright />
                </Typography>
              </Grid>
            </Grid>
      </Container>
    </Box>
  );
}

