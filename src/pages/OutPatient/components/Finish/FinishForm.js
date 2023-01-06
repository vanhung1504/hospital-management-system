import { Autocomplete, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

function FinishForm() {
  const [show, setShow] = useState(false);

  const {
    register,
    unregister,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (String(watch("finishExam")) === "1") {
      setShow(true);
      register("depId", { required: true });
    } else {
      setShow(false);
      unregister("depId");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("finishExam")]);

  useEffect(() => {
    setValue("finishExam", null);
  }, [setValue]);

  const khoaPhong = useSelector((state) => state.departments)
    .filter((item) => !item.name.toLowerCase().startsWith("pk"))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mb-3">
      <div className="mt-2 form-check d-flex align-items-center">
        <input
          className="form-check-input mt-0"
          type="radio"
          name="finishExam"
          id="dangKham"
          value={0}
          {...register("finishExam")}
        />
        <label className="form-check-label ms-1" htmlFor="dangKham">
          Đang khám
        </label>
      </div>

      <div className="mt-2 form-check d-flex align-items-center">
        <input
          className="form-check-input mt-0"
          type="radio"
          name="finishExam"
          id="hoanTatKham"
          value={2}
          {...register("finishExam")}
        />
        <label className="form-check-label ms-1" htmlFor="hoanTatKham">
          Hoàn tất khám
        </label>
      </div>

      <div className="mt-2 d-flex align-items-center">
        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input mt-0"
            type="radio"
            name="finishExam"
            id="nhapVien"
            value={1}
            {...register("finishExam")}
          />
          <label className="form-check-label ms-1" htmlFor="nhapVien">
            Nhập viện
          </label>
        </div>

        {show && (
          <div className="ms-2 flex-grow-1">
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
                    options={khoaPhong.map((item) => item.id)}
                    getOptionLabel={(option) =>
                      khoaPhong?.find((item) => item.id === option)?.name
                    }
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
                      onChange(data);
                      return data;
                    }}
                    value={value || null}
                  />
                </div>
              )}
              //   rules={{ required: false }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FinishForm);
