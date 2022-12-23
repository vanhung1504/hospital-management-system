import { Autocomplete, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { GiMedicines } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UNITS } from "~/pages/Configs/components/Medicines/units";
import { saveMedicine } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function MedicinesForm({
  visitId,
  medId,
  medicines: medicinesPatient,
  setLock,
}) {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const [unit, setUnit] = useState(-1);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(saveMedicine({ medicine: { ...data, unit: unit }, id: visitId }));
    toast.success("Lưu thông tin thành công!");
    if (medId) {
      setLock(true);
    } else {
      setValue("medicineId", null);
    }
  };

  const displayHowToUse = () => {
    const { route, amount, frequency, time } = watch();

    if (
      route?.length > 0 &&
      amount?.length > 0 &&
      frequency?.length > 0 &&
      time?.length > 0
    ) {
      return `${route} ${amount} x ${frequency} vào ${time}`;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (medicinesPatient && medId) {
      const drugInfo = medicinesPatient.find((med) => med.medicineId === medId);
      if (drugInfo) {
        for (const key of Object.keys(drugInfo)) {
          setValue(key, drugInfo[key]);
        }
        setUnit(drugInfo.unit);
      }
    }
    setFocus("medicineId");
  }, [setFocus, setValue, medicinesPatient, medId]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Ten thuoc, So luong */}
        <Row className="mt-2">
          <Col xs={12} className="mb-2">
            <div>
              <label htmlFor="medicineId" className="form-label mb-0">
                Tên thuốc
              </label>
              <Controller
                name="medicineId"
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <div className="mui-autocomplete">
                    <Autocomplete
                      options={medicines.map((item) => item.id)}
                      getOptionLabel={(option) => {
                        const med = medicines?.find(
                          (item) => item.id === option
                        );
                        return med.name;
                      }}
                      renderInput={(params) => (
                        <>
                          <TextField {...params} inputRef={ref} />
                          {errors.medicineId && (
                            <span className="text-danger fst-italic fs-6">
                              Trường này là bắt buộc!
                            </span>
                          )}
                        </>
                      )}
                      onChange={(_, data) => {
                        if (data) {
                          setUnit(
                            ((id) =>
                              medicines?.find((item) => item.id === id)?.unit)(
                              data
                            )
                          );
                        } else {
                          setUnit(-1);
                        }
                        setValue("quantity", null);
                        onChange(data);
                        return data;
                      }}
                      value={value || null}
                    />
                  </div>
                )}
                rules={{ required: true }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          {/* Duong dung */}
          <Col xs={12} sm={6} md={3} className="mb-2">
            <div>
              <label htmlFor="route" className="form-label mb-0">
                Đường dùng
              </label>
              <input
                type="text"
                className="form-control"
                id="route"
                autoComplete="off"
                {...register("route", {
                  required: true,
                  onBlur: (e) => setValue("route", e.target.value.trim()),
                })}
              ></input>
              {errors.route && (
                <div className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Lieu luong */}
          <Col xs={12} sm={6} md={3} className="mb-2">
            <div>
              <label htmlFor="amount" className="form-label mb-0">
                Liều lượng
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                autoComplete="off"
                {...register("amount", {
                  required: true,
                  onBlur: (e) => setValue("amount", e.target.value.trim()),
                })}
              ></input>
              {errors.amount && (
                <div className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Tần suất */}
          <Col xs={12} sm={6} md={3} className="mb-2">
            <div>
              <label htmlFor="frequency" className="form-label mb-0">
                Tần suất
              </label>
              <input
                type="text"
                className="form-control"
                id="frequency"
                autoComplete="off"
                {...register("frequency", {
                  required: true,
                  onBlur: (e) => setValue("frequency", e.target.value.trim()),
                })}
              ></input>
              {errors.frequency && (
                <div className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>

          {/* Thoi điểm */}
          <Col xs={12} sm={6} md={3} className="mb-2">
            <div>
              <label htmlFor="time" className="form-label mb-0">
                Thời điểm
              </label>
              <input
                type="text"
                className="form-control"
                id="time"
                autoComplete="off"
                {...register("time", {
                  required: true,
                  onBlur: (e) => setValue("time", e.target.value.trim()),
                })}
              ></input>
              {errors.time && (
                <div className="text-danger fst-italic fs-6">
                  Trường này là bắt buộc!
                </div>
              )}
            </div>
          </Col>
        </Row>

        {displayHowToUse() && (
          <Row>
            <Col xs={12}>
              <p className="my-2 text-danger fw-bold">{displayHowToUse()}</p>
            </Col>
          </Row>
        )}

        {/* So luong */}
        <Row>
          <Col xs={4} sm={3} className="mb-2">
            <div>
              <label htmlFor="quantity" className="form-label mb-0">
                Số lượng
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="quantity"
                autoComplete="off"
                {...register("quantity", {
                  required: "Trường này là bắt buộc!",
                  min: {
                    value: 1,
                    message: "Số lượng ít nhất phải là 1!",
                  },
                  pattern: {
                    value: /^[0-9]\d*$/,
                    message: "Số lượng phải là số nguyên dương!",
                  },
                  onBlur: (e) => setValue("quantity", e.target.value.trim()),
                })}
              ></input>
              {errors.quantity && (
                <div className="text-danger fst-italic fs-6">
                  {errors.quantity.message}
                </div>
              )}
            </div>
          </Col>
          <Col xs={4} sm={3} className="mb-2">
            <div>
              <label htmlFor="unit" className="form-label mb-0">
                ĐVT
              </label>
              <select id="unit" className="form-select" disabled value={unit}>
                <option value={-1} disabled>
                  --ĐVT--
                </option>
                {UNITS.sort((a, b) => a.name.localeCompare(b.name)).map(
                  (item) => (
                    <option value={item.value} key={item.name}>
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </Col>
          <Col xs={4} sm={3} className="mb-2 d-flex align-items-end">
            <Button type="submit">
              <GiMedicines className="me-2" />
              Lưu
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default memo(MedicinesForm);
