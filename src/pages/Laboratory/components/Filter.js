import { format } from "date-fns";
import { memo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import DatePicker from "~/components/DatePicker";

function Filter({ setFilter, setSelect }) {
  const methods = useForm({
    defaultValues: {
      fromTime: format(new Date(), "dd/MM/yyyy"),
      toTime: format(new Date(), "dd/MM/yyyy"),
      status: "chuaSID",
    },
  });

  const { register, handleSubmit } = methods;

  const onSubmit = (data) => {
    setSelect(null);
    setFilter(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="pt-2">
          <Col lg={3} md={4} sm={6} xs={12} className="mb-2">
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

          <Col lg={3} md={4} sm={6} xs={12} className="mb-2">
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

          <Col lg={3} md={4} sm={6} xs={12} className="mb-2">
            <Button type="submit" className="d-flex align-items-center">
              <FaEye className="me-1 text-warning fs-5" />
              Xem
            </Button>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={3} md={4} xs={6} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id="noSID"
                value={"noSID"}
                defaultChecked
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor="noSID">
                Chưa cấp SID
              </label>
            </div>
          </Col>
          <Col lg={3} md={4} xs={6} className="mb-2 d-flex align-items-center">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="status"
                id="yesSID"
                value="yesSID"
                {...register("status")}
              />
              <label className="form-check-label ms-1" htmlFor="yesSID">
                Đã cấp SID
              </label>
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
}

export default memo(Filter);
