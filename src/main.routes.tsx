import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import CreateGame from "./page/CreateGame";
import CreateAccount from "./page/CreateAccount";
import Login from "./page/Login";
import ProtectedRouter from "./components/ProtectedRouter";
import { GlobalStateProvider } from "./context/GlobalContext";

const MainRoutes = () => {
  return (
    <GlobalStateProvider>
      <Routes>
        <Route path={"/create-account"} element={<CreateAccount />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          index
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />
        <Route
          path={"/"}
          element={
            <ProtectedRouter>
              {" "}
              <Home />{" "}
            </ProtectedRouter>
          }
        />

        <Route
          path={"/create-game"}
          element={
            <ProtectedRouter>
              <CreateGame />
            </ProtectedRouter>
          }
        />
      </Routes>
    </GlobalStateProvider>
  );
};

export default MainRoutes;
