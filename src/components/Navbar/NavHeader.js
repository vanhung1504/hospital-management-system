import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);

function NavHeader({ userInfo: { fullname, userCode, departement } }) {
  return (
    <>
      <div className={cx("nav-header")}>
        <h2 className={cx("user-name")}>{fullname}</h2>
        <h3 className={cx("user-code")}>{userCode}</h3>
        <h3 className={cx("user-khoaphong")}>{departement}</h3>
      </div>
      <hr className={cx("divider")}></hr>
    </>
  );
}

export default NavHeader;
