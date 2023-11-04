/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { Role, Roles } from "../interfaces/Role";
import { setRoles } from "../stores/slices/authSlice";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import useRefreshToken from "../hooks/useRefreshToken";

interface AccessTokenPayload {
  sub: string;
  username: string;
  roles: [];
  iat: number;
  exp: number;
}
interface Props {
  allowedRoles: Roles;
}
const RequireAuth = ({ allowedRoles }: Props) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const decoded: AccessTokenPayload | undefined = accessToken
    ? jwt_decode(accessToken)
    : undefined;
  

  const roles = decoded?.roles || [];
  useEffect (() =>{
    dispatch(setRoles(roles))
  },[])

  return roles.find((role: Role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
