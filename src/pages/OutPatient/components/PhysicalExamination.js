import { memo, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillEdit, AiFillSave, AiOutlineRollback } from "react-icons/ai";
import { TbReportMedical } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getMedicalVisitMetaInfoById,
  saveVisitMetaInfo,
} from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function PhysicalExamination({ visitId }) {
  const defaultValue = useMemo(
    () => ({
      pulse: null,
      bloodPressure: null,
      breathing: null,
      hypothermia: null,
      weight: null,
      height: null,
      generalCondition: null,
      reviewOfSystems: null,
      diagnosis: null,
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
    if (!lock) setFocus("pulse");
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
    <Container className="mt-3">
      <form>
        <Row className="align-items-center">
          <Col xs={10}>
            <h2 className="m-0 fs-5 fw-bold">III. KHÁM LÂM SÀNG</h2>
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
          {/* Mach */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="pulse" className="form-label mb-0">
                Mạch (lần/phút)
              </label>
              <input
                type="text"
                className="form-control"
                id="pulse"
                disabled={lock}
                autoComplete="off"
                {...register("pulse", {
                  onBlur: (e) => setValue("pulse", e.target.value.trim()),
                  validate: (val) => {
                    if (val !== "" && isNaN(val))
                      return "Giá trị nhập không phải là số!";
                  },
                })}
              ></input>
              {errors.pulse && (
                <div id="pulse" className="text-danger fst-italic fs-6">
                  {errors.pulse.message}
                </div>
              )}
            </div>
          </Col>

          {/* Huyet ap */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="bloodPressure" className="form-label mb-0">
                Huyết áp (mmHg)
              </label>
              <input
                type="text"
                className="form-control"
                id="bloodPressure"
                disabled={lock}
                autoComplete="off"
                {...register("bloodPressure", {
                  onBlur: (e) =>
                    setValue("bloodPressure", e.target.value.trim()),
                })}
              ></input>
            </div>
          </Col>

          {/* Nhip tho */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="breathing" className="form-label mb-0">
                Nhịp thở (lần/phút)
              </label>
              <input
                type="text"
                className="form-control"
                id="breathing"
                disabled={lock}
                autoComplete="off"
                {...register("breathing", {
                  onBlur: (e) => setValue("breathing", e.target.value.trim()),
                  validate: (val) => {
                    if (val !== "" && isNaN(val))
                      return "Giá trị nhập không phải là số!";
                  },
                })}
              ></input>
              {errors.breathing && (
                <div id="breathing" className="text-danger fst-italic fs-6">
                  {errors.breathing.message}
                </div>
              )}
            </div>
          </Col>

          {/* Than nhiet */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="hypothermia" className="form-label mb-0">
                Thân nhiệt (<sup>o</sup>C)
              </label>
              <input
                type="text"
                className="form-control"
                id="hypothermia"
                disabled={lock}
                autoComplete="off"
                {...register("hypothermia", {
                  onBlur: (e) => setValue("hypothermia", e.target.value.trim()),
                  validate: (val) => {
                    if (val !== "" && isNaN(val))
                      return "Giá trị nhập không phải là số!";
                  },
                })}
              ></input>
              {errors.hypothermia && (
                <div id="hypothermia" className="text-danger fst-italic fs-6">
                  {errors.hypothermia.message}
                </div>
              )}
            </div>
          </Col>

          {/* Can nang */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="weight" className="form-label mb-0">
                Cân nặng (kg)
              </label>
              <input
                type="text"
                className="form-control"
                id="weight"
                disabled={lock}
                autoComplete="off"
                {...register("weight", {
                  onBlur: (e) => setValue("weight", e.target.value.trim()),
                  validate: (val) => {
                    if (val !== "" && isNaN(val))
                      return "Giá trị nhập không phải là số!";
                  },
                })}
              ></input>
              {errors.weight && (
                <div id="weight" className="text-danger fst-italic fs-6">
                  {errors.weight.message}
                </div>
              )}
            </div>
          </Col>

          {/* Chieu cao */}
          <Col md={4} sm={6} className="mb-2">
            <div>
              <label htmlFor="height" className="form-label mb-0">
                Chiều cao (cm)
              </label>
              <input
                type="text"
                className="form-control"
                id="height"
                disabled={lock}
                autoComplete="off"
                {...register("height", {
                  onBlur: (e) => setValue("height", e.target.value.trim()),
                  validate: (val) => {
                    if (val !== "" && isNaN(val))
                      return "Giá trị nhập không phải là số!";
                  },
                })}
              ></input>
              {errors.height && (
                <div id="height" className="text-danger fst-italic fs-6">
                  {errors.height.message}
                </div>
              )}
            </div>
          </Col>

          {/* Toan than */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="generalCondition" className="form-label mb-0">
                Toàn thân
              </label>
              <textarea
                className="form-control"
                id="generalCondition"
                disabled={lock}
                autoComplete="off"
                {...register("generalCondition", {
                  required: true,
                  onBlur: (e) =>
                    setValue("generalCondition", e.target.value.trim()),
                })}
              ></textarea>
              {errors.generalCondition && (
                <div
                  id="generalCondition"
                  className="text-danger fst-italic fs-6"
                >
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Cac bo phan */}
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="reviewOfSystems" className="form-label mb-0">
                Các bộ phận
              </label>
              <textarea
                className="form-control"
                id="reviewOfSystems"
                disabled={lock}
                autoComplete="off"
                {...register("reviewOfSystems", {
                  required: true,
                  onBlur: (e) =>
                    setValue("reviewOfSystems", e.target.value.trim()),
                })}
              ></textarea>
              {errors.reviewOfSystems && (
                <div
                  id="reviewOfSystems"
                  className="text-danger fst-italic fs-6"
                >
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Chan doan */}
          <Col xs={12} className="mb-2">
            <div>
              <label
                htmlFor="diagnosis"
                className="form-label text-primary fw-bold mb-0 d-flex align-items-center"
              >
                <TbReportMedical className="mb-1 me-1 text-danger" />
                <span>Chẩn đoán</span>
              </label>
              <textarea
                className="form-control"
                id="diagnosis"
                disabled={lock}
                autoComplete="off"
                {...register("diagnosis", {
                  required: true,
                  onBlur: (e) => setValue("diagnosis", e.target.value.trim()),
                })}
              ></textarea>
              {errors.diagnosis && (
                <div id="diagnosis" className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default memo(PhysicalExamination);
