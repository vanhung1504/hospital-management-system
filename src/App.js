import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "~/components/Navbar";
import useCheckUser from "~/hooks/useCheckUser";
import Configs from "~/pages/Configs";
import DiagnosticImaging from "~/pages/DiagnosticImaging";
import Home from "~/pages/Home";
import InPatient from "~/pages/InPatient";
import Laboratory from "~/pages/Laboratory";
import NotFound, { NotFoundRedirect } from "~/pages/NotFound";
import Nutrition from "~/pages/Nutrition";
import OutPatient from "~/pages/OutPatient";
import Pharmacy from "~/pages/Pharmacy";
import Reception from "~/pages/Reception";
import { getUserById } from "~/store/features/systemConfigs/usersSlice";

function App() {
  const privateRoutes = [
    {
      role: "reception",
      name: "Tiếp đón",
      imgPage: "receptionImg",
      path: "/reception",
      element: <Reception />,
    },
    {
      role: "outpatient",
      name: "Ngoại trú",
      imgPage: "outPatientImg",
      path: "/outpatient",
      element: <OutPatient />,
    },
    {
      role: "inpatient",
      name: "Nội trú",
      imgPage: "inPatientImg",
      path: "/inpatient",
      element: <InPatient />,
    },
    {
      role: "laboratory",
      name: "CLS - Xét nghiệm",
      imgPage: "laboratoryImg",
      path: "/laboratory",
      element: <Laboratory />,
    },
    {
      role: "xray",
      name: "CLS - CĐHA",
      imgPage: "xrayImg",
      path: "/diagnostic-imaging",
      element: <DiagnosticImaging />,
    },
    {
      role: "pharmacy",
      name: "Kho dược",
      imgPage: "pharmacyImg",
      path: "/pharmacy",
      element: <Pharmacy />,
    },
    {
      role: "nutrition",
      name: "DD - Tiết chế",
      imgPage: "nutritionImg",
      path: "/nutrition",
      element: <Nutrition />,
    },
    {
      role: "configs",
      name: "Quản trị",
      imgPage: "configsImg",
      path: "/configs",
      element: <Configs />,
    },
  ];

  const id = useCheckUser();
  const userLoggedIn = useSelector(getUserById(id));
  const userRoles = id ? userLoggedIn.roles : null;

  return (
    <Router basename="/hospital-management-system">
      <div className="App">
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            exact
            element={
              <>
                {userRoles && (
                  <Navbar
                    privateRoutes={privateRoutes}
                    userLoggedIn={userLoggedIn}
                  />
                )}
                <Home />
              </>
            }
          />
          <Route path="/404" exact element={<NotFound />} />

          {/* Private route */}
          {userRoles &&
            privateRoutes.map((route) => {
              let routes = [];
              if (userRoles.indexOf(route.role) >= 0) {
                routes.push(
                  <Route
                    key={route.role}
                    path={route.path}
                    exact
                    element={
                      <>
                        <Navbar privateRoutes={privateRoutes} />
                        {route.element}
                      </>
                    }
                  />
                );
              }
              return routes;
            })}
          {/* Not found route */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      </div>
    </Router>
  );
}

export default App;
