import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import LoginRegister from "./LoginRegister";

export default function AppRoutes(props) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/auth"} element={<LoginRegister />} />
        </Routes>
      </BrowserRouter>
    );
}