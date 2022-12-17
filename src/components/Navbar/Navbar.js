import classNames from "classnames/bind";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.scss";
import NavFooter from "./NavFooter";
import NavHeader from "./NavHeader";
import NavItem from "./NavItem";
import { getUserById } from "~/store/features/systemConfigs/usersSlice";
import { getDepartementById } from "~/store/features/systemConfigs/departmentsSlice";
import ChangePassword from "./ChangePassword";
const cx = classNames.bind(styles);

function Navbar({ privateRoutes }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showChangePass, setShowChangePass] = useState(false);

  const { id } = useSelector((state) => state.userLoggedIn);
  let userLoggedIn = useSelector(getUserById(id));
  const userRoles = userLoggedIn.roles;
  const { name } = useSelector(getDepartementById(userLoggedIn.departement));
  userLoggedIn = { ...userLoggedIn, departement: name };

  return (
    <nav
      className={cx(
        "wrapper",
        "d-flex flex-column align-items-center justify-content-between",
        showNavbar ? "" : "hide"
      )}
    >
      <NavHeader userInfo={userLoggedIn} />
      <div
        className={cx(
          "nav-content",
          "d-flex align-items-center flex-column flex-grow-1"
        )}
      >
        {privateRoutes.map((item, index) => {
          const headerItemComp = [];
          if (!!userRoles.find((role) => role === item.role)) {
            headerItemComp.push(
              <NavItem
                key={item.name}
                name={item.name}
                imgName={item.imgPage}
                toPage={item.path}
              />
            );
          }
          return headerItemComp;
        })}
      </div>

      <NavFooter setShowChangePass={setShowChangePass} />

      {showChangePass && (
        <ChangePassword
          userLoggedIn={userLoggedIn}
          setShowChangePass={setShowChangePass}
        />
      )}

      <div
        className={cx(
          "toggleNavbar",
          "d-flex justify-content-center align-items-center",
          showNavbar ? "" : "hide"
        )}
        onClick={() => setShowNavbar(!showNavbar)}
      >
        <FaChevronLeft />
      </div>
    </nav>
  );
}

export default Navbar;
