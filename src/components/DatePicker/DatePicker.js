import { format, isValid } from "date-fns";
import { memo, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { stringToDate } from "~/store/features/functions";

function DatePicker({
  id,
  type = "dd/MM/yyyy",
  required = true,
  className,
  relateTo,
}) {
  const methods = useFormContext();
  const {
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  // Date picker setup
  const [datePicker, setDatePicker] = useState({
    id: "",
    isShow: false,
    selected: new Date(),
  });
  const datePickerRef = useRef();
  const onFocusInputDatePicker = (e, id) => {
    const dateStr = e.target.value.trim();
    const date = stringToDate(dateStr, type, "/", ":");
    setDatePicker((prev) => ({
      ...prev,
      id: id,
      isShow: true,
      selected: isValid(date) ? new Date(date) : new Date(),
    }));
  };
  const onBlurInputDatePicker = (e, id) => {
    const dateStr = e.target.value.trim();
    const date = stringToDate(dateStr, type, "/", ":");
    if (isValid(date)) {
      setValue(id, format(date, type));
    } else {
      setValue(id, "");
    }
  };
  const onSelectDatePicker = (selectedDay, id) => {
    clearErrors(id);
    setValue(id, format(selectedDay, type));
    setDatePicker((prev) => ({
      ...prev,
      id: "",
      isShow: false,
      selected: selectedDay,
    }));
  };
  const onCheckValidRangeTime = (selectedDay) => {
    const { id, method } = relateTo;

    const firstDate = new Date(
      stringToDate(selectedDay, type, "/", ":")
    ).getTime();

    const secondDate = new Date(
      stringToDate(getValues(id), type, "/", ":")
    ).getTime();

    if (method === "<=" && firstDate - secondDate > 0) {
      return "Ngày bắt đầu lớn hơn ngày kết thúc!";
    } else if (method === ">=" && firstDate - secondDate < 0) {
      return "Ngày bắt đầu lớn hơn ngày kết thúc!";
    }
  };
  const datePickerFooter = (id) => (
    <div className="mt-2 d-flex justify-content-between">
      <Button
        size="sm"
        variant="danger"
        onClick={(e) => {
          setValue(id, "");
          setDatePicker((prev) => ({
            ...prev,
            id: "",
            isShow: false,
            selected: new Date(),
          }));
        }}
      >
        Xóa
      </Button>
      <Button
        size="sm"
        variant="success"
        onClick={(e) => {
          clearErrors(id);
          setValue(id, format(new Date(), type));
          setDatePicker((prev) => ({
            ...prev,
            id: "",
            isShow: false,
            selected: new Date(),
          }));
        }}
      >
        Hôm nay
      </Button>
    </div>
  );
  useEffect(() => {
    const handleClick = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        event.target.id !== datePicker.id
      ) {
        setDatePicker((prev) => ({ ...prev, id: "", isShow: false }));
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [datePicker]);

  return (
    <div className={`position-relative ${className}`}>
      <input
        type="text"
        className="form-control"
        placeholder={type}
        autoComplete="off"
        id={id}
        {...register(id, {
          required: required ? "Trường này là bắt buộc!" : required,
          onBlur: (e) => onBlurInputDatePicker(e, id),
          validate: relateTo ? (val) => onCheckValidRangeTime(val) : () => {},
        })}
        onFocus={(e) => onFocusInputDatePicker(e, id)}
      ></input>
      {errors[id] && (
        <span className="text-danger fst-italic fs-6">
          {errors[id].message}
        </span>
      )}

      {datePicker.id === id && datePicker.isShow && (
        <div ref={datePickerRef}>
          <DayPicker
            mode="single"
            showOutsideDays
            selected={datePicker.selected}
            defaultMonth={new Date(datePicker.selected)}
            onSelect={(selectedDay) => {
              selectedDay
                ? onSelectDatePicker(selectedDay, id)
                : onSelectDatePicker(datePicker.selected, id);
            }}
            footer={datePickerFooter(id)}
            className="position-absolute"
          />
        </div>
      )}
    </div>
  );
}

export default memo(DatePicker);
