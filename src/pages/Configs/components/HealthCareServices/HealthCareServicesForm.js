import { memo, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatToCurrency } from "~/store/features/functions";
import {
  getServiceByNameAndId,
  saveService,
} from "~/store/features/systemConfigs/healthCareServicesSlice";

function HealthCareServicesForm({ service, setService }) {
  const serviceItem = useSelector(getServiceByNameAndId({ ...service }));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    dispatch(
      saveService({
        ...service,
        ...data,
      })
    );
    reset({
      name: "",
      price: "",
    });
    setService((prev) => ({ ...prev, id: null }));
    toast.success("Lưu thông tin thành công");
  };

  useEffect(() => {
    if (serviceItem) {
      clearErrors();
      setValue("name", serviceItem.name);
      setValue("price", formatToCurrency(serviceItem.price));
      setFocus("name");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceItem, service]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={7} sm={12} className="mb-2">
          <input
            type="name"
            className="form-control"
            placeholder="Tên dịch vụ"
            autoComplete="off"
            id="name"
            {...register("name", {
              required: "Trường này là bắt buộc!",
              onBlur: (e) => {
                setValue("name", e.target.value.trim());
              },
              onChange: (e) => {
                if (e.target.value.trim() === "") {
                  setValue("price", "");
                  setService((prev) => ({ ...prev, id: null }));
                }
              },
            })}
          ></input>
          {errors.name && (
            <span className="text-danger fst-italic fs-6">
              {errors.name.message}
            </span>
          )}
        </Col>
        <Col md={3} xs={8} className="mb-2">
          <input
            type="price"
            className="form-control"
            placeholder="Giá DV (VNĐ)"
            autoComplete="off"
            id="price"
            {...register("price", {
              required: "Trường này là bắt buộc!",
              onBlur: (e) => {
                setValue("price", e.target.value.trim());
              },
              onChange: (e) => {
                let price = e.target.value.trim();
                if (price.length > 0 && price !== "NaN") {
                  setValue("price", formatToCurrency(price));
                } else {
                  setValue("price", "");
                }
              },
              validate: (val) => {
                if (
                  val === "NaN" ||
                  (val !== "" && isNaN(val.replaceAll(/./g, "")))
                )
                  return "Giá trị nhập không phải là số!";
              },
            })}
          ></input>
          {errors.price && (
            <span className="text-danger fst-italic fs-6">
              {errors.price.message}
            </span>
          )}
        </Col>

        <Col md={2} xs={4} className="mb-2">
          <Button type="submit" className="w-100">
            {service.id ? "Lưu" : "Thêm"}
          </Button>
        </Col>
      </Row>
    </form>
  );
}

export default memo(HealthCareServicesForm);
