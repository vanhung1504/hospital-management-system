import { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiFillEdit, AiFillSave, AiOutlineRollback } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveVisitMetaInfo } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function OtherServicesActions({ lock, setLock, visitId, servicesSelected }) {
  const dispatch = useDispatch();

  const onEdit = () => {
    setLock(!lock);
  };

  const onCancel = () => {
    setLock(true);
  };

  const onSubmit = () => {
    const selected = servicesSelected;
    const data = {};

    for (let i = 0; i < selected.length; ++i) {
      const [serviceKey, id] = selected[i].split("@");
      if (!data.hasOwnProperty(serviceKey)) {
        data[serviceKey] = [id];
      } else {
        data[serviceKey].push(id);
      }
    }

    dispatch(saveVisitMetaInfo({ otherServices: { ...data }, id: visitId }));
    toast.success("Lưu thông tin thành công!");
    setLock(!lock);
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center">
        <Col xs={10}>
          <h2 className="m-0 fs-5 fw-bold">IV. CLS - DV KHÁC</h2>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          {lock || (
            <Button onClick={() => onCancel()} className="me-3">
              <AiOutlineRollback />
            </Button>
          )}

          <Button onClick={lock ? () => onEdit() : () => onSubmit()}>
            {lock ? <AiFillEdit /> : <AiFillSave />}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(OtherServicesActions);
