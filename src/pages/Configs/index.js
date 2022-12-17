import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import MainLayout from "~/components/MainLayout";
import {
  DepartementsList,
  HealthCareServices,
  Medicines,
  UsersList,
} from "./components";

function Configs() {
  const [compIndex, setCompIndex] = useState(null);

  const handleSelectChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setCompIndex(value);
    } else {
      setCompIndex(null);
    }
  };

  const Configs = [
    {
      title: "Danh sách người dùng",
      component: <UsersList />,
    },
    {
      title: "Danh sách khoa phòng",
      component: <DepartementsList />,
    },
    {
      title: "Danh sách dịch vụ",
      component: <HealthCareServices />,
    },
    {
      title: "Danh sách thuốc",
      component: <Medicines />,
    },
  ];

  return (
    <MainLayout title="Quản trị hệ thống">
      <Container style={{ marginTop: "60px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            <Form.Select className="fw-bold" onChange={handleSelectChange}>
              <option value={-1}>Lựa chọn mục cần cấu hình</option>
              {Configs.map((item, index) => (
                <option value={index} key={index} className="py-5">
                  {`${index + 1}. ${item.title}`}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row className="justify-content-center" style={{ marginTop: "20px" }}>
          <Col>{compIndex !== null ? Configs[compIndex].component : ""}</Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Configs;
