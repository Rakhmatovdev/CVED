// components/AuthGuard.tsx
import { useEffect } from "react";
import {  Outlet,useNavigate } from "react-router"; //Navigate, useLocation, 
import AppLayout from "@/app/layouts/app-layout.tsx";
// import { useAuthStore } from "@/entities/auth/model/store.ts";
import { setNavigator } from "@/routes/navigation.ts";

const AuthGuard = () => {
  // Helpers
  const navigate = useNavigate();
  // const location = useLocation();
  // Store
  // const { accessToken } = useAuthStore();

  // Effects
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  // if (!accessToken)
  //   return <Navigate to={`/auth/login`} state={{ from: location }} replace />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AuthGuard;
