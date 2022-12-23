import { memo, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getLaboById } from "~/store/features/laboratory/laboratorySlice";
import { getMedicalVisitMetaInfoById } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function SampleInfo({ select }) {
  const [initData, setInitData] = useState({ id: null, visitId: null });
  const labo = useSelector(getLaboById(initData.id));
  const visit = useSelector(getMedicalVisitMetaInfoById(initData.visitId));

  useEffect(() => {
    setInitData({ id: select.data.id, visitId: select.data.visitId });
  }, [select]);

  return (
    <div>
      <Row>
        <Col xs={12} sm={6} className="mb-2">
          <Form.Label htmlFor="sid" className="mb-0">
            SID
          </Form.Label>
          <Form.Control
            type="text"
            id="sid"
            disabled
            className="fw-bold"
            defaultValue={labo?.sid}
          />
        </Col>

        <Col xs={12} sm={6} className="mb-2">
          <Form.Label htmlFor="receiptDate" className="mb-0">
            Ngày cấp barcode
          </Form.Label>
          <Form.Control
            type="text"
            id="receiptDate"
            disabled
            defaultValue={labo?.receiptDate}
          />
        </Col>

        <Col xs={12} className="mb-2">
          <Form.Label htmlFor="diagnosis" className="mb-0">
            Chẩn đoán
          </Form.Label>
          <Form.Control
            type="text"
            id="diagnosis"
            disabled
            defaultValue={visit?.diagnosis}
          />
        </Col>
      </Row>
    </div>
  );
}

export default memo(SampleInfo);
