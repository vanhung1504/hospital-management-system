import classNames from "classnames/bind";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { encodePassword } from "~/store/features/functions";
import { submitLogin } from "~/store/features/login/loginSlice";
import styles from "./FirstSection.module.scss";
const cx = classNames.bind(styles);

function LoginForm({ setShowLogin }) {
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleClose = () => setShowLogin(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;

    const checkValid = () => {
      let isValid = true;
      const index = users.findIndex((user) => user.username === username);
      if (index === -1) {
        isValid = false;
      } else if (
        users[index].password !== encodePassword(String(password)) ||
        users[index].userStatus === false
      ) {
        isValid = false;
      }

      return isValid;
    };

    setLoading(true);
    setTimeout(() => {
      if (checkValid()) {
        const { id } = users.find((user) => user.username === username);
        dispatch(submitLogin(id));
        toast.success("Đăng nhập thành công!");
        setShowLogin(false);
      } else {
        toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập hệ thống</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("mb-3")}>
            <label htmlFor="username" className={cx("form-label")}>
              Tên đăng nhâp
            </label>
            <input
              type="text"
              className={cx("form-control")}
              id="username"
              {...register("username", {
                required: true,
                onBlur: (e) => {
                  setValue("username", e.target.value.trim());
                },
              })}
            ></input>
            {errors.username && (
              <span className={cx("fs-6 text-danger fst-italic")}>
                Trường này là bắt buộc!
              </span>
            )}
          </div>

          <div className={cx("mb-3")}>
            <label htmlFor="password" className={cx("form-label")}>
              Mật khẩu
            </label>
            <input
              type="password"
              className={cx("form-control")}
              id="password"
              {...register("password", {
                required: true,
                onBlur: (e) => {
                  setValue("password", e.target.value.trim());
                },
              })}
            ></input>
            {errors.password && (
              <span className={cx("fs-6 text-danger fst-italic")}>
                Trường này là bắt buộc!
              </span>
            )}
          </div>

          <Button
            type="submit"
            className={cx(
              "d-flex align-items-center mx-auto py-2 px-3 rounded-pill fs-5 fw-bold"
            )}
            disabled={loading}
          >
            {loading && (
              <Spinner
                animation="border"
                variant="warning"
                size="sm"
                className={cx("me-2")}
              />
            )}

            <span>Đăng nhập</span>
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginForm;
