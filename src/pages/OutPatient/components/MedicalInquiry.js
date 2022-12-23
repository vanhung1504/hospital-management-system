import { memo, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillEdit, AiFillSave, AiOutlineRollback } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getMedicalVisitMetaInfoById,
  saveVisitMetaInfo,
} from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function MedicalInquiry({ visitId }) {
  const defaultValue = useMemo(
    () => ({
      chiefComplaint: null,
      historyIllness: null,
      pastMedicalHistory: null,
      familyHistory: null,
    }),
    []
  );

  const [lock, setLock] = useState(true);
  const dispatch = useDispatch();
  const visit = useSelector(getMedicalVisitMetaInfoById(visitId));
  const methods = useForm({
    defaultValues: {},
  });
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    clearErrors,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!lock) setFocus("chiefComplaint");
    if (!visit) {
      for (const key of Object.keys(defaultValue)) {
        setValue(key, defaultValue[key]);
      }
    } else {
      for (const key of Object.keys(defaultValue)) {
        if (visit.hasOwnProperty(key)) {
          setValue(key, visit[key]);
        } else {
          setValue(key, null);
        }
      }
    }
  }, [setFocus, lock, setValue, visit, defaultValue]);

  const onSubmit = (data) => {
    dispatch(saveVisitMetaInfo({ ...data, id: visitId }));
    toast.success("Lưu thông tin thành công!");
    setLock(!lock);
  };

  const onEdit = () => {
    setLock(!lock);
  };

  const onCancel = () => {
    clearErrors();
    reset({ ...visit });
    setLock(true);
  };

  return (
    <div className="mt-3">
      <form>
        <Row className="align-items-center">
          <Col xs={10}>
            <h2 className="m-0 fs-5 fw-bold">II. HỎI BỆNH</h2>
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

        <Row>
          {/* Ly do */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="chiefComplaint" className="form-label mb-0">
                Lý do đến khám
              </label>
              <input
                type="text"
                className="form-control"
                id="chiefComplaint"
                disabled={lock}
                autoComplete="off"
                {...register("chiefComplaint", {
                  required: true,
                  onBlur: (e) =>
                    setValue("chiefComplaint", e.target.value.trim()),
                })}
              ></input>
              {errors.chiefComplaint && (
                <div
                  id="chiefComplaint"
                  className="text-danger fst-italic fs-6"
                >
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Qua trinh benh */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="historyIllness" className="form-label mb-0">
                Quá trình bệnh lý
              </label>
              <textarea
                className="form-control"
                id="historyIllness"
                disabled={lock}
                autoComplete="off"
                {...register("historyIllness", {
                  required: true,
                  onBlur: (e) =>
                    setValue("historyIllness", e.target.value.trim()),
                })}
              ></textarea>
              {errors.historyIllness && (
                <div
                  id="historyIllness"
                  className="text-danger fst-italic fs-6"
                >
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Tien su ban than */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="pastMedicalHistory" className="form-label mb-0">
                Tiền sử bản thân
              </label>
              <textarea
                className="form-control"
                id="pastMedicalHistory"
                disabled={lock}
                autoComplete="off"
                {...register("pastMedicalHistory", {
                  required: true,
                  onBlur: (e) =>
                    setValue("pastMedicalHistory", e.target.value.trim()),
                })}
              ></textarea>
              {errors.pastMedicalHistory && (
                <div
                  id="pastMedicalHistory"
                  className="text-danger fst-italic fs-6"
                >
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Tien su gia dinh */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="familyHistory" className="form-label mb-0">
                Tiền sử gia đình
              </label>
              <textarea
                className="form-control"
                id="familyHistory"
                disabled={lock}
                autoComplete="off"
                {...register("familyHistory", {
                  required: true,
                  onBlur: (e) =>
                    setValue("familyHistory", e.target.value.trim()),
                })}
              ></textarea>
              {errors.familyHistory && (
                <div id="familyHistory" className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default memo(MedicalInquiry);
