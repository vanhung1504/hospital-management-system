import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { BsFacebook, BsSkype } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("footer", "w-100")}>
      <Container>
        <Row>
          <Col
            md={{ span: 6, order: 2 }}
            className={cx(
              "link-wrapper",
              "d-flex align-items-center justify-content-end"
            )}
          >
            <a
              href="https://join.skype.com/invite/tyD0vT3022Bh"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("link-item")}
            >
              <BsSkype className="text-primary" />
            </a>

            <a
              href="https://www.youtube.com/channel/UCGsULF2rp28f6QyqD9xz_7Q"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("link-item")}
            >
              <FaYoutube className="text-danger" />
            </a>
            <a
              href="https://www.facebook.com/vanhung.yhn"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("link-item")}
            >
              <BsFacebook className="text-primary" />
            </a>
          </Col>
          <Col
            md={{ span: 6, order: 1 }}
            className={cx("copyright-wrapper", "d-flex align-items-center")}
          >
            <p className={cx("copyright")}>
              © Copyright 2022 by Văn Hùng. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
