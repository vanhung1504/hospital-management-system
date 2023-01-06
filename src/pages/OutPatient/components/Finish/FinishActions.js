import { memo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { AiFillEdit, AiFillSave, AiOutlineRollback } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { finishVisit } from "~/store/features/medicalVisits/medicalVisitsSlice";

function FinishActions({ lock, setLock, visitId }) {
  const dispatch = useDispatch();
  const { handleSubmit } = useFormContext();
  const onEdit = () => {
    setLock(!lock);
  };

  const onCancel = () => {
    setLock(true);
  };

  const onSubmit = (data) => {
    const { finishExam, depId } = data;
    if (finishExam === null) {
      toast.error("Lỗi. Bản phải lựa chọn một hình thức để kết thúc đợt khám!");
    } else {
      dispatch(
        finishVisit({
          id: visitId,
          status: +finishExam,
          depId,
        })
      );
      toast.success("Hoàn tất khám thành công!");
      setLock(true);
    }
  };

  return (
    <div className="mt-3">
      <Row className="align-items-center">
        <Col xs={10}>
          <h2 className="m-0 fs-5 fw-bold">VI. KẾT THÚC KHÁM</h2>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          {lock || (
            <Button onClick={() => onCancel()} className="me-3">
              <AiOutlineRollback />
            </Button>
          )}

          <Button onClick={lock ? () => onEdit() : handleSubmit(onSubmit)}>
            {lock ? <AiFillEdit /> : <AiFillSave />}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default memo(FinishActions);
