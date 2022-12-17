import { Link, useMatch } from "react-router-dom";

import images from "./images";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);

function NavItem({ name, imgName, toPage, activeOnlyWhenExact }) {
  let match = useMatch({
    path: toPage,
    exact: activeOnlyWhenExact,
  });

  let isActive = false;

  if (match) {
    match.pathname === toPage ? (isActive = true) : (isActive = false);
  }

  return (
    <Link
      to={toPage}
      className={cx(
        "nav-item",
        "d-flex align-items-center",
        isActive ? "active" : ""
      )}
    >
      <div
        className={cx(
          "nav-img-box",
          "d-flex align-items-center justify-content-center"
        )}
      >
        <img src={images[imgName]} alt={name} className={cx("nav-img")}></img>
      </div>

      <span className={cx("nav-name", isActive ? "active" : "")}>{name}</span>
    </Link>
  );
}

export default NavItem;
