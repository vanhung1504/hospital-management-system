import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./ThirdSection.module.scss";
const cx = classNames.bind(styles);

function ThirdSection() {
  return (
    <section className={cx("third-section")}>
      <Container>
        <Row className={cx("align-items-center")}>
          <Col sm={12} md={6}>
            <div className={cx("wrapper", "left")}>
              <h2 className={cx("title")}>
                Giải pháp quản lý y tế mô hình chuỗi
              </h2>
              <p className={cx("content", "py-3")}>
                Quản lý tối ưu mô hình chuỗi bệnh viên, phòng khám, y tế. Đồng
                bộ hoá tất các các thông tin bệnh nhân, quy trình vận hành và dữ
                liệu tài chính của các cơ sở trong cùng một chuỗi.
              </p>

              <p className={cx("content", "py-3")}>
                Từ đó giúp cơ sở y tế dễ dàng quản lý tập trung tất cả các chuỗi
                của mình trên một nền tảng phần mềm.
              </p>

              <a
                href="https://qa-solutions.net/"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("link", "d-inline-block mt-3")}
              >
                Tìm hiểu thêm
              </a>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <Row>
              <Col sm={12}>
                <div className={cx("wrapper", "right")}>
                  <h2 className={cx("title")}>Xuyên xuốt</h2>
                  <p className={cx("content", "py-3")}>
                    Hồ sơ bệnh nhân và khách hàng được lưu trữ thống nhất xuyên
                    suốt trong hệ thống
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className={cx("wrapper", "right", "mt-3")}>
                  <h2 className={cx("title")}>Nhân rộng</h2>
                  <p className={cx("content", "py-3")}>
                    Khả năng nhân rộng số lượng cơ sở ý tế trực thuộc
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className={cx("wrapper", "right", "mt-3")}>
                  <h2 className={cx("title")}>Liên thông</h2>
                  <p className={cx("content", "py-3")}>
                    Cho phép luân chuyển và quản lý kho giữa các cơ sở
                  </p>
                </div>
              </Col>

              <Col md={6}>
                <div className={cx("wrapper", "right", "mt-3")}>
                  <h2 className={cx("title")}>Phân cấp</h2>
                  <p className={cx("content", "py-3")}>
                    Khả năng quản lý cơ sở y tế với nhiều phân cấp khác nhau
                  </p>
                </div>
              </Col>

              <Col md={6}>
                <div className={cx("wrapper", "right", "mt-3")}>
                  <h2 className={cx("title")}>Đồng bộ</h2>
                  <p className={cx("content", "py-3")}>
                    Tính năng đồng bộ và quản lý thống nhất dữ liệu giữa các cơ
                    sở
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ThirdSection;
