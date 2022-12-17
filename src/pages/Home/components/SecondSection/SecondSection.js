import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import img1 from "~/assets/images/HomePage/Section-2/1.png";
import img2 from "~/assets/images/HomePage/Section-2/2.png";
import img3 from "~/assets/images/HomePage/Section-2/3.png";
import img4 from "~/assets/images/HomePage/Section-2/4.png";
import img5 from "~/assets/images/HomePage/Section-2/5.png";
import img6 from "~/assets/images/HomePage/Section-2/6.png";
import styles from "./SecondSection.module.scss";
const cx = classNames.bind(styles);

function SecondSection() {
  const reasons = [
    {
      img: img1,
      title: "Dịch Vụ Trọn Gói",
      desc: "Phần mềm được bảo trì, nâng cấp thường xuyên, đảm bảo hiệu quả cao nhất trong quá trình hoạt động của khách hàng.",
    },
    {
      img: img2,
      title: "Nâng Cao Chất Lượng Dịch Vụ Khám Chữa Bệnh",
      desc: "Giao diện trực quan và thao tác nhanh chóng giúp nhân viên y tế tiết kiệm thời gian cho các thủ tục hành chính.",
    },
    {
      img: img3,
      title: "Phù Hợp Mọi Quy Mô & Chuỗi Cơ Sở",
      desc: "Các cơ sở y tế hay các chuỗi phòng khám, bệnh viện với mọi quy mô đều có thể tin tưởng và hài lòng với giải pháp của chúng tôi.",
    },
    {
      img: img4,
      title: "Đơn giản nhưng mạnh mẽ",
      desc: "Cải thiện hiệu quả công việc với phần mềm quản lý tích hợp Bệnh án điện tử được thiết kế tối ưu hóa dành riêng cho từng cơ sở y tế.",
    },
    {
      img: img5,
      title: "Nhanh và Hiệu Quả",
      desc: "Giải pháp của QAS được thiết kế hướng tới sự đơn giản, dễ sử dụng cho người dùng nhưng đảm bảo đầy đủ chức năng, mang đến giải pháp toàn diện.",
    },
    {
      img: img6,
      title: "Vận Hành Các Cơ Sở Lớn",
      desc: "Đáp ứng số lượng lớn người dùng cùng lúc mà không làm chậm hệ thống.",
    },
  ];

  return (
    <section className={cx("wrapper", "my-5")}>
      <Container>
        <Row>
          <h2 className={cx("section-heading", "text-center")}>
            Tại sao lựa chọn chúng tôi
          </h2>

          <div className={cx("divider", "text-center")}>
            <span className={cx("divider-separator")}></span>
          </div>
        </Row>

        <Row className={cx("mt-5")}>
          {reasons.map((item) => (
            <Col lg={4} md={6} key={item.img} className={cx("mb-4")}>
              <div className={cx("card-box", "h-100 d-flex")}>
                <div className={cx("img-box")}>
                  <img src={item.img} alt={item.img} />
                </div>
                <div className={cx("info-box")}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default SecondSection;
