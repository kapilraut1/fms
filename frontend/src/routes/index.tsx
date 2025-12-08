import { Route, Routes } from "react-router";
import { routes } from "./path";
import Home from "@/pages/home";
import Player from "@/pages/player";
import Startingxi from "@/pages/startingxi";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />}>
        <Route path={routes.playerManagement} element={<Player />} />
        <Route path={routes.startingXI} element={<Startingxi />} />
      </Route>
    </Routes>
  );
};
