import { Navigate } from "react-router-dom";

function NotFoundRedirect() {
  return <Navigate to="/404" />;
}

export default NotFoundRedirect;
