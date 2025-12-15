import { Route, Routes } from "react-router";
import { routes } from "./path";
import Home from "@/pages/Home";
import Player from "@/pages/Player";
import Startingxi from "@/pages/Startingxi";

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
