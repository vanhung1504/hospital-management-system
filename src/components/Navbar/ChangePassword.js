import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveUser } from "~/store/features/systemConfigs/usersSlice";
import { encodePassword } from "~/store/features/functions";
import { toast } from "react-toastify";

function ChangePassword({ userLoggedIn, setShowChangePass }) {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      saveUser({
        id: userLoggedIn.id,
        password: encodePassword(data.password),
      })
    );
    toast.success("Đổi mật khẩu thành công!");
    setShowChangePass(false);
  };

  return (
    <Modal
      show={true}
      onHide={() => setShowChangePass(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Tên người dùng
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              id="fullname"
              defaultValue={`${userLoggedIn.fullname} (${userLoggedIn.userCode})`}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", {
                required: true,
                onBlur: (e) => {
                  setValue("password", e.target.value.trim());
                },
              })}
            ></input>
            {errors.password && (
              <span className="fs-6 text-danger fst-italic">
                Trường này là bắt buộc!
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="passConfirm" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              id="passConfirm"
              {...register("passConfirm", {
                required: "Trường này là bắt buộc!",
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Mật khẩu không khớp!";
                  }
                },
                onBlur: (e) => {
                  setValue("passConfirm", e.target.value.trim());
                },
              })}
            ></input>
            {errors.passConfirm && (
              <span className="fs-6 text-danger fst-italic">
                {errors.passConfirm.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="d-flex align-items-center mx-auto py-2 px-3 rounded-pill fs-5 fw-bold"
          >
            <span>Hoàn tất</span>
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePassword;
