import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("page_404")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-sm-12")}>
            <div className={cx("text-center")}>
              <div className={cx("four_zero_four_bg")}>
                <h1 className={cx("text-center ")}>404</h1>
              </div>

              <div className={cx("contant_box_404")}>
                <h3 className={cx("h2")}>Page not found</h3>

                <p>the page you are looking for not avaible!</p>

                <Link to="/" className={cx("link_404")}>
                  VỀ TRANG CHỦ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
