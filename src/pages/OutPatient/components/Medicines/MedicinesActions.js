import { memo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillEdit, AiOutlineRollback } from "react-icons/ai";

function MedicinesActions({ lock, setLock, setMedId }) {
  return (
    <div className="mt-3">
      <Row className="align-items-center">
        <Col xs={10}>
          <h2 className="m-0 fs-5 fw-bold">V. ĐƠN THUỐC</h2>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setLock(!lock);
              setMedId(null);
            }}
          >
            {lock ? <AiFillEdit /> : <AiOutlineRollback />}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default memo(MedicinesActions);
