import { memo } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

function Search({ setSearch }) {
  return (
    <Row className="mt-2">
      <Col xs={12}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Tìm kiếm bệnh nhân theo Họ tên/PID"
            onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
          />
        </InputGroup>
      </Col>
    </Row>
  );
}

export default memo(Search);
