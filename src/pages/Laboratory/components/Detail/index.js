import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PatientInfo from "~/components/PatientInfo";
import SampleInfo from "./SampleInfo";
import XNTable from "./XNTable";

function Detail({ select, setSelect }) {
  return (
    <Container className="mt-5 mb-3">
      <Row>
        <div className="text-center fs-3 fw-bold text-primary">
          CHI TIẾT XÉT NGHIỆM
        </div>
      </Row>
      <Row>
        <Col lg={8} md={12} className="mx-auto">
          <PatientInfo visitId={select.data.visitId} />
          {select.type === "yesSID" && <SampleInfo select={select} />}
          <XNTable select={select} setSelect={setSelect} />
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Detail);
