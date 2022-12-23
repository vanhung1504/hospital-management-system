import classNames from "classnames/bind";
import { MdStars } from "react-icons/md";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
  return (
    <div
      className={cx(
        "wrapper",
        "d-flex align-items-center justify-content-center"
      )}
    >
      <span className="me-2">----------</span>
      <span>
        <MdStars className="text-warning fs-6" />
      </span>
      <span>
        <MdStars className="text-warning fs-5" />
      </span>
      <span>
        <MdStars className="text-warning fs-4" />
      </span>
      <span>
        <MdStars className="text-warning fs-5" />
      </span>
      <span>
        <MdStars className="text-warning fs-6" />
      </span>
      <span className="ms-2">----------</span>
    </div>
  );
}

export default Footer;
