import { Autocomplete, TextField } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BiAddToQueue } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getMedicalVisitById,
  saveVisit,
} from "~/store/features/medicalVisits/medicalVisitsSlice";

function MedicalVisitForm({ patientId, setFormInput, formInput }) {
  const visitIdRef = useRef();
  const contentRef = useRef();
  const depIdRef = useRef();
  let visit = useSelector(getMedicalVisitById(formInput.id));
  if (visit) {
    switch (visit.status) {
      case -1:
        visit = { ...visit, status: "Chờ khám" };
        break;
      case 0:
        visit = { ...visit, status: "Đang khám" };
        break;
      case 1:
        visit = { ...visit, status: "Đang nằm viện" };
        break;
      case 2:
        visit = { ...visit, status: "Đã ra viện" };
        break;
      default:
        break;
    }

    if (
      contentRef.current !== undefined &&
      visit.content !== contentRef.current &&
      visitIdRef.current === formInput.id
    )
      visit.content = contentRef.current;

    if (
      depIdRef.current !== undefined &&
      visit.depId !== depIdRef.current &&
      visitIdRef.current === formInput.id
    )
      visit.depId = depIdRef.current;
  }

  const goiKham = [
    ...useSelector((state) => state.healthCareServices.goiKham.data),
  ].sort((a, b) => a.name.localeCompare(b.name));

  const visits = useSelector((state) => state.medicalVisits);
  const phongKham = useSelector((state) => state.departments)
    .filter((item) => item.name.toLowerCase().startsWith("pk"))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => {
      let totalVisit = visits.reduce((count, visit) => {
        if (visit.depId === item.id && +visit.status === -1) {
          count += 1;
        }
        return count;
      }, 0);
      return { ...item, totalVisit };
    });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (visit) {
      for (const key in visit) {
        setValue(key, visit[key]);
      }
    }
    setFocus("content");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFocus, visit, visits]);

  const onSubmit = (data) => {
    if (patientId) {
      dispatch(saveVisit({ ...data, patientId: patientId }));
      toast.success("Lưu thông tin thành công!");
    } else {
      toast.error("Không thể lưu do không có thông tin bệnh nhân!");
    }
  };

  const onSubmitAndClose = (data) => {
    onSubmit(data);
    setFormInput({
      isShow: false,
      id: null,
    });
  };

  const onSubmitAndContinue = (data) => {
    onSubmit(data);
    setFormInput({
      isShow: true,
      id: null,
    });
    reset({
      id: null,
      status: null,
      createDate: null,
      content: null,
      depId: null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ID */}
      <Row>
        <div className="d-flex align-items-center mb-2">
          <Col xs={2}>
            <label htmlFor="id" className="me-2 my-0 form-label">
              ID
            </label>
          </Col>
          <Col xs={10}>
            <input
              type="text"
              className="form-control"
              id="id"
              {...register("id")}
              disabled
            ></input>
          </Col>
        </div>
      </Row>

      {/* PID, Create Date */}
      <Row className="g-md-0">
        <Col xs={12} md={6} className="pe-md-2">
          <div className="d-flex align-items-center mb-2">
            <Col xs={2} md={4}>
              <label htmlFor="status" className="me-2 my-0 form-label">
                Trạng thái
              </label>
            </Col>
            <Col xs={10} md={8} className="ps-md-1">
              <input
                type="text"
                className="form-control"
                id="status"
                {...register("status")}
                disabled
              ></input>
            </Col>
          </div>
        </Col>
        <Col xs={12} md={6} className="ps-md-2">
          <div className="d-flex align-items-center mb-2">
            <Col xs={2} md={4}>
              <label htmlFor="createDate" className="me-2 my-0 form-label">
                Ngày tạo
              </label>
            </Col>
            <Col xs={10} md={8} className="ps-md-1">
              <input
                type="text"
                className="form-control"
                id="createDate"
                {...register("createDate")}
                disabled
              ></input>
            </Col>
          </div>
        </Col>
      </Row>

      {/* Nội dung khám */}
      <Row>
        <div className="d-flex align-items-center mb-2">
          <Col xs={2}>
            <label htmlFor="content" className="me-2 my-0 form-label">
              Nội dung
            </label>
          </Col>
          <Col xs={10}>
            {/* <input
              type="text"
              className="form-control"
              id="content"
              {...register("content", {
                required: true,
                onBlur: (e) => setValue("content", e.target.value.trim()),
              })}
            ></input>
            {errors.content && (
              <span className="text-danger fst-italic fs-6">
                Trường này là bắt buộc!
              </span>
            )} */}

            <Controller
              name="content"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <div className="mui-autocomplete">
                  <Autocomplete
                    options={goiKham.map((item) => item.id)}
                    getOptionLabel={(option) =>
                      goiKham?.find((item) => item.id === option).name
                    }
                    renderInput={(params) => (
                      <>
                        <TextField {...params} inputRef={ref} />
                        {errors.content && (
                          <span className="text-danger fst-italic fs-6">
                            Trường này là bắt buộc!
                          </span>
                        )}
                      </>
                    )}
                    onChange={(_, data) => {
                      visitIdRef.current = formInput.id;
                      contentRef.current = data;
                      onChange(data);
                      return data;
                    }}
                    value={value || null}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          </Col>
        </div>
      </Row>

      {/* Phòng khám */}
      <Row>
        <div className="d-flex align-items-center mb-2">
          <Col xs={2}>
            <label htmlFor="depId" className="me-2 my-0 form-label">
              Phòng khám
            </label>
          </Col>
          <Col xs={10}>
            {/* <select
              id="depId"
              {...register("depId", {
                required: true,
                validate: (val) => {
                  if (+val === -1) {
                    return "Trường này là bắt buộc!";
                  }
                },
              })}
              className="form-select"
              defaultValue={-1}
            >
              <option value={-1} disabled>
                --Lựa chọn phòng khám--
              </option>

              {phongKham.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name} - {item.totalVisit} lượt chờ khám
                </option>
              ))}
            </select>
            {errors.depId && (
              <span className="text-danger fst-italic fs-6">
                Trường này là bắt buộc!
              </span>
            )} */}

            <Controller
              name="depId"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <div className="mui-autocomplete">
                  <Autocomplete
                    options={phongKham.map((item) => item.id)}
                    getOptionLabel={(option) => {
                      const dep = phongKham?.find((item) => item.id === option);
                      return `${dep.name} - ${dep.totalVisit} lượt chờ khám`;
                    }}
                    renderInput={(params) => (
                      <>
                        <TextField {...params} />
                        {errors.depId && (
                          <span className="text-danger fst-italic fs-6">
                            Trường này là bắt buộc!
                          </span>
                        )}
                      </>
                    )}
                    onChange={(_, data) => {
                      visitIdRef.current = formInput.id;
                      depIdRef.current = data;
                      onChange(data);
                      return data;
                    }}
                    value={value || null}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          </Col>
        </div>
      </Row>

      {/* Submit */}
      <Row className="my-2">
        <Col xs={12} sm={4} className="my-1">
          <div className="mx-1 d-flex align-items-center justify-content-center">
            <Button className="px-2" onClick={handleSubmit(onSubmitAndClose)}>
              <FaSave className="me-2 fs-5" />
              <span>Hoàn tất</span>
            </Button>
          </div>
        </Col>
        <Col xs={12} sm={4} className="my-1">
          <div className="mx-1 d-flex align-items-center justify-content-center">
            <Button
              className="px-2"
              onClick={handleSubmit(onSubmitAndContinue)}
            >
              <BiAddToQueue className="me-2 fs-5" />
              <span>Lưu và Thêm</span>
            </Button>
          </div>
        </Col>
        <Col xs={12} sm={4} className="my-1">
          <div className="mx-1 d-flex align-items-center justify-content-center">
            <Button
              className="px-2"
              onClick={() => setFormInput({ isShow: false, id: null })}
            >
              <GiCancel className="me-2 fs-5" />
              <span>Hủy</span>
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
}

export default memo(MedicalVisitForm);
