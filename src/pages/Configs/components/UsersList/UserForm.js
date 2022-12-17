import { memo, useCallback, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RiRefreshFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dialog from "~/components/Dialog";
import { encodePassword } from "~/store/features/functions";
import {
  getUserById,
  saveUser,
} from "~/store/features/systemConfigs/usersSlice";
import Roles from "../Roles";

function UserForm({ setShowForm, userId }) {
  // Dialog
  const [dialog, setDialog] = useState({
    isShow: false,
  });

  const rolesRef = useRef([]);
  const userStatusRef = useRef(true);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const user = useSelector(getUserById(userId));
  const departements = [...useSelector((state) => state.departments)]
    .filter((dep) => !dep.name.toLowerCase().startsWith("pk"))
    .sort((a, b) => a.name.localeCompare(b.name));
  const { chucDanh, chucVu } = useSelector((state) => state.othersInfo);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...user },
  });

  const handleClose = () => {
    setShowForm((prev) => ({
      ...prev,
      isShow: false,
      userId: null,
    }));
  };

  const handleRoles = useCallback((data) => {
    rolesRef.current = data;
  }, []);

  const onSubmit = (data) => {
    data = {
      ...data,
      roles: rolesRef.current,
      userStatus: userStatusRef.current,
    };

    const isExistUsername = checkUsernameExist(data);

    if (!isExistUsername) {
      dispatch(saveUser(data));
      setShowForm((prev) => ({
        ...prev,
        isShow: data.id ? false : true,
        userId: null,
      }));
      toast.success(`Lưu thành công: ${data.fullname} (${data.username})`);
      resetForm();
    } else {
      throw new Error("Tên đăng nhập đã tồn tại!");
    }
  };

  const resetForm = () => {
    userStatusRef.current = true;
    rolesRef.current = [];
    reset({
      id: "",
      fullname: "",
      userCode: "",
      departement: -1,
      chucDanh: -1,
      chucVu: -1,
      username: "",
      password: "",
    });
  };

  const checkUsernameExist = (data) => {
    const { id, username } = data;

    let result = false;
    const index = users.findIndex((user) => user.username === username);
    if (index !== -1) {
      if (users[index].id === id) {
        result = false;
      } else {
        result = true;
      }
    }

    return result;
  };

  const onErrorUsername = (message) => {
    setError(
      "username",
      { type: "custom", message: message },
      { shouldFocus: true }
    );
  };

  const resetPassword = () => {
    const resetPassword = (bool) => {
      if (bool) {
        setValue("password", encodePassword("123"));
        setDialog({
          isShow: false,
        });
      } else {
        setDialog({
          isShow: false,
        });
      }
    };

    setDialog({
      isShow: true,
      title: "Thông báo!",
      content: `Reset mật khẩu về mặc định: 123?`,
      modalConfirm: "modalYesNo",
      handleModal: resetPassword,
    });
  };

  userStatusRef.current = userId ? user.userStatus : true;
  rolesRef.current = userId ? user.roles : [];

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <form
            onSubmit={handleSubmit((data) => {
              try {
                onSubmit(data);
              } catch (e) {
                onErrorUsername(e.message);
              }
            })}
          >
            <Container>
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

              {/* Ho ten */}
              <Row>
                <div className="d-flex align-items-center mb-2">
                  <Col xs={2}>
                    <label htmlFor="fullname" className="me-2 my-0 form-label">
                      Họ tên
                    </label>
                  </Col>
                  <Col xs={10}>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      {...register("fullname", {
                        required: true,
                        onBlur: (e) => {
                          setValue("fullname", e.target.value.trim());
                        },
                      })}
                    ></input>
                    {errors.fullname && (
                      <span className="text-danger fst-italic fs-6">
                        Trường này là bắt buộc!
                      </span>
                    )}
                  </Col>
                </div>
              </Row>

              {/* MaNV + KhoaPhong */}
              <Row className="g-md-0">
                <Col xs={12} md={6} className="pe-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label
                        htmlFor="userCode"
                        className="me-2 my-0 form-label"
                      >
                        Mã NV
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1">
                      <input
                        type="text"
                        className="form-control"
                        id="userCode"
                        {...register("userCode")}
                        disabled
                      ></input>
                    </Col>
                  </div>
                </Col>
                <Col xs={12} md={6} className="ps-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label
                        htmlFor="departement"
                        className="me-2 my-0 form-label"
                      >
                        Bộ phận
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1">
                      <select
                        id="departement"
                        {...register("departement", {
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
                          --Lựa chọn khoa/phòng--
                        </option>
                        {departements.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.departement && (
                        <span className="text-danger fst-italic fs-6">
                          Trường này là bắt buộc!
                        </span>
                      )}
                    </Col>
                  </div>
                </Col>
              </Row>

              {/* Chuc danh, chuc vu */}
              <Row className="g-md-0">
                <Col xs={12} md={6} className="pe-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label
                        htmlFor="chucDanh"
                        className="me-2 my-0 form-label"
                      >
                        Chức danh
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1">
                      <select
                        id="chucDanh"
                        {...register("chucDanh", {
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
                          --Lựa chọn chức danh--
                        </option>
                        {chucDanh.map((item) => (
                          <option value={item.id} key={item.id}>
                            {`${item.name} (${item.shortName})`}
                          </option>
                        ))}
                      </select>
                      {errors.chucDanh && (
                        <span className="text-danger fst-italic fs-6">
                          Trường này là bắt buộc!
                        </span>
                      )}
                    </Col>
                  </div>
                </Col>
                <Col xs={12} md={6} className="ps-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label htmlFor="chucVu" className="me-2 my-0 form-label">
                        Chức vụ
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1">
                      <select
                        id="chucVu"
                        {...register("chucVu", {
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
                          --Lựa chọn chức vụ--
                        </option>
                        {chucVu.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.chucVu && (
                        <span className="text-danger fst-italic fs-6">
                          Trường này là bắt buộc!
                        </span>
                      )}
                    </Col>
                  </div>
                </Col>
              </Row>

              {/* Ten dang nhap/Mat khau */}
              <Row className="g-md-0">
                <Col xs={12} md={6} className="pe-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label
                        htmlFor="username"
                        className="me-2 my-0 form-label"
                      >
                        Username
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("username", {
                          required: "Trường này là bắt buộc!",
                          onBlur: (e) => {
                            setValue("username", e.target.value.trim());
                          },
                        })}
                      ></input>
                      {errors.username && (
                        <span className="text-danger fst-italic fs-6">
                          {errors.username.message}
                        </span>
                      )}
                    </Col>
                  </div>
                </Col>
                <Col xs={12} md={6} className="ps-md-2">
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2} md={4}>
                      <label
                        htmlFor="password"
                        className="me-2 my-0 form-label"
                      >
                        Mật khẩu
                      </label>
                    </Col>
                    <Col xs={10} md={8} className="ps-md-1 position-relative">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password")}
                        disabled
                      ></input>

                      {userId && (
                        <Button
                          className="position-absolute"
                          style={{
                            top: "50%",
                            right: "6px",
                            height: "30px",
                            width: "30px",
                            transform: "translateY(-50%)",
                          }}
                          onClick={() => resetPassword()}
                        >
                          <RiRefreshFill
                            className="text-white position-absolute"
                            style={{
                              top: "50%",
                              left: "50%",
                              width: "20px",
                              height: "20px",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        </Button>
                      )}
                    </Col>
                  </div>
                </Col>
              </Row>

              {/* Phân quyền */}
              <Row>
                <div className="d-flex mb-2">
                  <Col xs={2}>
                    <label htmlFor="roles" className="me-2 my-0 form-label">
                      Phân quyền
                    </label>
                  </Col>
                  <Col xs={10}>
                    <Roles
                      canSelect
                      handleRoles={handleRoles}
                      defaultSelect={rolesRef.current}
                    />
                  </Col>
                </div>
              </Row>

              {/* Submit */}
              <hr className="w-100"></hr>
              <Row>
                <div className="d-flex align-items-center my-2">
                  <Col xs={2}>
                    <Form as={"div"}>
                      <Form.Check
                        type="switch"
                        id="userStatus"
                        label="Active"
                        onChange={(e) =>
                          (userStatusRef.current = e.target.checked)
                        }
                        defaultChecked={userStatusRef.current}
                      />
                    </Form>
                  </Col>
                  <Col xs={10}>
                    <div className="d-flex align-items-center justify-content-end">
                      <Button type="submit" className="px-4">
                        <span>Lưu</span>
                      </Button>
                    </div>
                  </Col>
                </div>
              </Row>
            </Container>
          </form>
        </Modal.Body>
      </Modal>

      {dialog.isShow && (
        <Dialog
          title={dialog.title}
          content={dialog.content}
          modalConfirm={dialog.modalConfirm}
          handleModal={dialog.handleModal}
        />
      )}
    </>
  );
}

export default memo(UserForm);
