import Navbar from "~/components/Navbar";

function PrivateRoute({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PrivateRoute;
