import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./FourSection.module.scss";

const cx = classNames.bind(styles);

function FourSection() {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <section className={cx("sec-wrapper")}>
            <div className={cx("wrapper")}>
              <h2 className={cx("title")}>Dịch Vụ Cho Thuê Phần Mềm</h2>
              <p className={cx("content", "py-3")}>
                QAS cung cấp cho khách hàng giải pháp quản lý theo mô hình Dịch
                Vụ Phần Mềm – SaaS (Software as a Service)
              </p>
              <p className={cx("content", "py-3")}>
                Với mô hình này các khách hàng sẽ trả phí dịch vụ hàng tháng và
                phần mềm sẽ được nâng cấp, bảo trì miễn phí trong suốt quá trình
                sử dụng. Với dịch vụ này, QAS sẽ luôn đồng hành và giúp khách
                hàng có một nền tảng quản lý y tế ổn định và lâu dài.
              </p>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default FourSection;
