import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import MainWrapper from "./MainWrapper";
import Footer from "./Footer";
import AppRoutes from "./AppRoutes";


function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <MainWrapper>
          <AppRoutes />
        </MainWrapper>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;



