import { memo, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getMedicalVisitById } from "~/store/features/medicalVisits/medicalVisitsSlice";
import { getPatientById } from "~/store/features/patients/patientsSlice";
import { getDepartementById } from "~/store/features/systemConfigs/departmentsSlice";
import { getUserById } from "~/store/features/systemConfigs/usersSlice";
import { getOtherInfoById } from "~/store/features/othersInfo/othersInfoSlice";

function PatientInfo({ visitId }) {
  const [visitIdInit, setVisitIdInit] = useState(null);
  const visit = useSelector(getMedicalVisitById(visitIdInit));
  const patientId = visit ? visit.patientId : "";
  const patient = useSelector(getPatientById(patientId));
  const depId = visit ? visit.depId : "";
  const departement = useSelector(getDepartementById(depId));
  const doctor = useSelector(getUserById(visit?.userId));
  const chucDanhId = doctor?.chucDanh;
  const chucDanh = useSelector(
    getOtherInfoById({ name: "chucDanh", id: chucDanhId })
  );

  useEffect(() => {
    setVisitIdInit(visitId);
  }, [visitId]);

  return (
    <Container className="mt-3">
      <Row>
        <h2 className="fs-5 fw-bold">I. HÀNH CHÍNH</h2>
      </Row>

      <Row>
        <Col md={6} className="mb-2">
          <Form.Label htmlFor="fullname" className="mb-0">
            Họ tên
          </Form.Label>
          <Form.Control
            type="text"
            id="fullname"
            className="fw-bold text-uppercase"
            disabled
            defaultValue={patient?.fullname}
          />
        </Col>
        <Col md={3} sm={6} className="mb-2">
          <Form.Label htmlFor="dob" className="mb-0">
            Ngày sinh
          </Form.Label>
          <Form.Control
            type="text"
            id="dob"
            disabled
            defaultValue={patient?.dob}
          />
        </Col>
        <Col md={3} sm={6} className="mb-2">
          <Form.Label htmlFor="gender" className="mb-0">
            Giới tính
          </Form.Label>
          <Form.Control
            type="text"
            id="gender"
            disabled
            value={patient && +patient.gender === 0 ? "Nữ" : "Nam"}
            onChange={(e) => {}}
          />
        </Col>

        <Col xs={12} className="mb-2">
          <Form.Label htmlFor="address" className="mb-0">
            Địa chỉ
          </Form.Label>
          <Form.Control
            type="text"
            id="address"
            disabled
            defaultValue={patient?.address}
          />
        </Col>

        <Col md={4} sm={6} className="mb-2">
          <Form.Label htmlFor="pid" className="mb-0">
            PID
          </Form.Label>
          <Form.Control
            type="text"
            id="pid"
            disabled
            className="fw-bold"
            defaultValue={patient?.pid}
          />
        </Col>
        <Col md={4} sm={6} className="mb-2">
          <Form.Label htmlFor="phone" className="mb-0">
            SĐT
          </Form.Label>
          <Form.Control
            type="text"
            id="phone"
            disabled
            defaultValue={patient?.phone}
          />
        </Col>
        <Col md={4} sm={6} className="mb-2">
          <Form.Label htmlFor="depId" className="mb-0">
            Nơi khám
          </Form.Label>
          <Form.Control
            type="text"
            id="depId"
            disabled
            defaultValue={departement?.name}
          />
        </Col>

        <Col xs={12} sm={6} className="mb-2">
          <Form.Label htmlFor="visitDate" className="mb-0">
            Ngày ĐK khám
          </Form.Label>
          <Form.Control
            type="text"
            id="visitDate"
            disabled
            defaultValue={visit?.createDate}
          />
        </Col>

        <Col xs={12} sm={6} className="mb-2">
          <Form.Label htmlFor="address" className="mb-0">
            Bác sĩ
          </Form.Label>
          <Form.Control
            type="text"
            id="address"
            disabled
            defaultValue={
              doctor ? `${chucDanh?.shortName}. ${doctor?.fullname}` : ""
            }
          />
        </Col>
      </Row>
    </Container>
  );
}

export default memo(PatientInfo);
