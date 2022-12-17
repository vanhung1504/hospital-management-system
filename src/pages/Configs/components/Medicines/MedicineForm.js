import { memo, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getMedicineById,
  saveMedicine,
} from "~/store/features/systemConfigs/medicinesSlice";
import { UNITS } from "./units";

function MedicineForm({ id, setId }) {
  const medicine = useSelector(getMedicineById(id));
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
    dispatch(saveMedicine({ ...data, id }));
    reset({
      name: "",
      unit: -1,
    });
    setId(null);
    toast.success("Lưu thông tin thành công!");
  };

  useEffect(() => {
    if (medicine) {
      clearErrors();
      setValue("name", medicine.name);
      setValue("unit", medicine.unit);
      setFocus("name");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicine]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={7} sm={12} className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tên thuốc-hoạt chất-hàm lượng"
            autoComplete="off"
            id="name"
            {...register("name", {
              required: "Trường này là bắt buộc!",
              onBlur: (e) => {
                setValue("name", e.target.value.trim());
              },
              onChange: (e) => {
                if (e.target.value.trim() === "") {
                  setValue("unit", -1);
                  setId(null);
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
          <select
            id="unit"
            {...register("unit", {
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
              --ĐVT--
            </option>
            {UNITS.sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
              <option value={item.value} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.unit && (
            <span className="text-danger fst-italic fs-6">
              Trường này là bắt buộc!
            </span>
          )}
        </Col>

        <Col md={2} xs={4} className="mb-2">
          <Button type="submit" className="w-100">
            {id ? "Lưu" : "Thêm"}
          </Button>
        </Col>
      </Row>
    </form>
  );
}

export default memo(MedicineForm);
