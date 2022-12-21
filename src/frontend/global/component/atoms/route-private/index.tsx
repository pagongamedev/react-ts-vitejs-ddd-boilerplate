import { Navigate } from 'react-router-dom';

/* eslint-disable react/display-name */
export default ({ isAuth, children }: any) => {
  return isAuth ? children : <Navigate to="/" replace />;
};