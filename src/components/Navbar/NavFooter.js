import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { RiLockPasswordLine, RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { submitLogout } from "~/store/features/login/loginSlice";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function NavFooter({ setShowChangePass }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <hr className={cx("divider")}></hr>
      <Button
        variant="contained"
        startIcon={<RiLockPasswordLine />}
        color="success"
        onClick={() => setShowChangePass(true)}
        className={cx("btn-footer")}
      >
        Đổi mật khẩu
      </Button>

      <Button
        variant="contained"
        startIcon={<RiLogoutBoxRLine />}
        color="info"
        onClick={() => {
          navigate("/");
          dispatch(submitLogout());
        }}
        className={cx("btn-footer")}
      >
        Đăng xuất
      </Button>
    </>
  );
}

export default NavFooter;
