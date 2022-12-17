import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header({ moduleName }) {
  return (
    <header className={cx("wrapper", "position-fixed")}>
      <Container className={cx("text-center text-white")}>
        <h1 className={cx("p-2 text-uppercase")}>{moduleName}</h1>
      </Container>
    </header>
  );
}

export default Header;
