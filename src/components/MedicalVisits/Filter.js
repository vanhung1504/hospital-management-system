import { format } from "date-fns";
import { memo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import DatePicker from "~/components/DatePicker";

function Filter({ setFilter, depRequired }) {
  const phongKham = useSelector((state) => state.departments)
    .filter((item) => item.name.toLowerCase().startsWith("pk"))
    .sort((a, b) => a.name.localeCompare(b.name));
  const methods = useForm({
    defaultValues: {
      fromTime: format(new Date(), "dd/MM/yyyy"),
      toTime: format(new Date(), "dd/MM/yyyy"),
      depId: -1,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    setFilter(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="pt-2">
          <Col md={3} sm={6} xs={12} className="mb-2">
            <div className="row">
              <div className="col-3 d-flex align-items-center">
                <label htmlFor="fromTime" className="me-2 my-0 form-label w-25">
                  Từ
                </label>
              </div>
              <div className="col-9">
                <div className="w-100">
                  <DatePicker
                    id="fromTime"
                    relateTo={{ id: "toTime", method: "<=" }}
                    className="flex-grow-1"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-2">
            <div className="row">
              <div className="col-3 d-flex align-items-center">
                <label htmlFor="toTime" className="me-2 my-0 form-label w-25">
                  Đến
                </label>
              </div>
              <div className="col-9">
                <div className="w-100">
                  <DatePicker
                    id="toTime"
                    relateTo={{ id: "fromTime", method: ">=" }}
                    className="flex-grow-1"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-2">
            <div className="row">
              <div className="col-3 d-flex align-items-center">
                <label htmlFor="depId" className="my-0 form-label">
                  PK
                </label>
              </div>
              <div className="col-9">
                <div className="w-100">
                  <select
                    id="depId"
                    {...register("depId", {
                      required: depRequired,
                      validate: depRequired
                        ? (val) => {
                            if (+val === -1) {
                              return "Trường này là bắt buộc!";
                            }
                          }
                        : (val) => {},
                    })}
                    className="form-select"
                    defaultValue={-1}
                  >
                    <option value={-1} disabled={depRequired}>
                      {depRequired
                        ? "--Lựa chọn phòng khám--"
                        : "--Tất cả PK--"}
                    </option>

                    {phongKham.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.depId && (
                    <span className="text-danger fst-italic fs-6">
                      Trường này là bắt buộc!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-2">
            <Button type="submit" className="d-flex align-items-center">
              <FaEye className="me-1 text-warning fs-5" />
              Xem
            </Button>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={6} sm={4} md={2} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id="all"
                value={"all"}
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor="all">
                Tất cả
              </label>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id={-1}
                value={-1}
                defaultChecked
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor={-1}>
                Chờ khám
              </label>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id={0}
                value={0}
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor={0}>
                Đang khám
              </label>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id={1}
                value={1}
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor={1}>
                Nhập viện
              </label>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id={2}
                value={2}
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor={2}>
                Ra viện
              </label>
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
}

export default memo(Filter);
