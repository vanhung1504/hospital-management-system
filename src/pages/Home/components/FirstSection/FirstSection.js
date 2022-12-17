import classNames from "classnames/bind";
import { useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { FaHouseUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import useCheckUser from "~/hooks/useCheckUser";
import { getUserById } from "~/store/features/systemConfigs/usersSlice";
import styles from "./FirstSection.module.scss";
import LoginForm from "./LoginForm";
const cx = classNames.bind(styles);

function FirstSection() {
  const [showLogin, setShowLogin] = useState(false);

  const id = useCheckUser();
  const userLoggedIn = useSelector(getUserById(id));

  return (
    <section className={cx("wrapper", "py-4 d-flex flex-column")}>
      <Container>
        <h1 className={cx("main-heading", "text-center text-danger fw-bold")}>
          HOSPITAL MANAGEMENT SYSTEM
        </h1>
      </Container>

      <Container
        className={cx("flex-grow-1 d-flex flex-column justify-content-center")}
      >
        <Row>
          <Col md={5} className={cx("mt-3 d-flex flex-column")}>
            <div>
              <h2 className={cx("slogan")}>Giải pháp quản lý y tế toàn diện</h2>
              <p className={cx("text-white mt-3")}>
                Giải pháp công nghệ thông tin và các ứng dụng phần mềm trong
                lĩnh vực y tế và tối ưu hoá việc quản lý các biểu mẫu, quy trình
                và bệnh án điện tử.
              </p>
            </div>
          </Col>

          <Col md={6} className={cx("ms-auto mt-3 d-flex flex-column")}>
            <div>
              <h2 className={cx("slogan")}>Được tin tưởng sử dụng bởi</h2>
              <div className={cx("meta-info", "mt-3")}>
                <Container>
                  <Row>
                    <Col>
                      <div
                        className={cx(
                          "meta-info-item",
                          "mt-2 d-flex flex-column"
                        )}
                      >
                        <div className={cx("counter")}>50+</div>
                        <div className={cx("name")}>Cơ sở khám chữa bệnh</div>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className={cx(
                          "meta-info-item",
                          "mt-2 d-flex flex-column"
                        )}
                      >
                        <div className={cx("counter")}>4000+</div>
                        <div className={cx("name")}>Chuyên viên y tế</div>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className={cx(
                          "meta-info-item",
                          "mt-2 d-flex flex-column"
                        )}
                      >
                        <div className={cx("counter")}>2 Triệu+</div>
                        <div className={cx("name")}>
                          Người bệnh phục vụ toàn quốc.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {userLoggedIn ? (
        <Stack className={cx("col-6 mx-auto mt-5")}>
          <div
            className={cx(
              "user-welcome",
              "d-flex align-items-center justify-content-center fs-2 fw-bold"
            )}
          >
            <FaHouseUser className={cx("icon", "me-2")} />
            <span>{userLoggedIn.fullname}</span>
          </div>
        </Stack>
      ) : (
        <Stack className={cx("col-3 mx-auto mt-5")}>
          <Button
            variant="danger"
            onClick={(e) => setShowLogin(true)}
            className="mx-auto px-5"
          >
            ĐĂNG NHẬP
          </Button>
        </Stack>
      )}

      {showLogin && <LoginForm setShowLogin={setShowLogin} />}
    </section>
  );
}

export default FirstSection;
