import { useGlobalState } from "../context/GlobalContext";
import { Routes, RouteProps, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouter = ({ children }: RouteProps) => {
  const { auth } = useGlobalState();

  useEffect(() => {
    if (!auth) {
      console.log("Faça o login novamente");
    }
  }, [auth]);

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRouter;
