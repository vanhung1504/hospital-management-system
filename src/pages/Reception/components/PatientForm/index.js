import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { BsFillPersonXFill } from "react-icons/bs";
import { FaRegAddressCard, FaSave } from "react-icons/fa";
import { RiCamera3Line, RiComputerLine } from "react-icons/ri";
import { TbPhotoOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import femaleAvatar from "~/assets/images/Reception/femaleAvatar.png";
import maleAvatar from "~/assets/images/Reception/maleAvatar.png";
import DatePicker from "~/components/DatePicker";
import Dialog from "~/components/Dialog";
import { blobToBase64, checkIfMobileDevice } from "~/store/features/functions";
import { deleteVisit } from "~/store/features/medicalVisits/medicalVisitsSlice";
import {
  deletePatient,
  getPatientById,
  savePatient,
} from "~/store/features/patients/patientsSlice";
import MediaStream from "../MediaStream";
import MedicalVisits from "../MedicalVisitsByPatient";
import styles from "./PatientForm.module.scss";
const cx = classNames.bind(styles);

function PatientForm({ id, setShowPatientForm }) {
  const [patientId, setPatientId] = useState(id);
  const isMobileDevide = checkIfMobileDevice();
  const dispatch = useDispatch();
  const patient = useSelector(getPatientById(id));
  const patientAfterCreate = useSelector(getPatientById(patientId));

  const [dialog, setDialog] = useState({
    isShow: false,
  });

  const [showStream, setShowStream] = useState(false);

  const methods = useForm({
    defaultValues: { ...patient },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const [avatar, setAvatar] = useState();
  const onChangeAvatar = (e) => {
    blobToBase64(e.target.files[0])
      .then((data) => setAvatar(data))
      .catch((e) => {});
  };
  useEffect(() => {
    // Set field after create patient
    if (patientAfterCreate) {
      setValue("id", patientAfterCreate.id);
      setValue("pid", patientAfterCreate.pid);
      setValue("createDate", patientAfterCreate.createDate);
    }

    // Set avatar
    Boolean(watch("id")) &&
      patient &&
      patient.avatar &&
      patient.id === patientAfterCreate.id &&
      setAvatar(patient.avatar);
    avatar || setValue("gender", Number(watch("gender")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("gender"), patientAfterCreate]);

  const resetForm = () => {
    setPatientId(null);
    setAvatar(null);
    reset({
      id: null,
      pid: null,
      createDate: null,
      fullname: "",
      dob: "",
      gender: -1,
      address: "",
      ethnic: "",
      religion: "",
      nationality: "",
      cccd: "",
      phone: "",
      otherPhone: "",
    });
  };

  const handleDeletePatient = ({ id, pid, fullname, dob }) => {
    const deletePatientDialog = (bool) => {
      if (bool) {
        dispatch(deletePatient(id));
        toast.success(`Xóa thành công: ${pid} - ${fullname} - ${dob}`);
        setDialog({
          isShow: false,
        });
        resetForm();
      } else {
        setDialog({
          isShow: false,
        });
      }
    };

    setDialog({
      isShow: true,
      title: "Thông báo!",
      content: `Bạn chắc chắn muốn xóa ${pid} - ${fullname} - ${dob} chứ?`,
      modalConfirm: "modalYesNo",
      handleModal: deletePatientDialog,
    });
  };

  const handleDeleteVisit = ({ id, content, depId }) => {
    const deleteVisitDialog = (bool) => {
      if (bool) {
        dispatch(deleteVisit(id));
        toast.success(`Xóa thành công lượt khám: ${content} ở ${depId}`);
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
      content: `Bạn chắc chắn muốn xóa lượt khám ${content} ở ${depId} chứ?`,
      modalConfirm: "modalYesNo",
      handleModal: deleteVisitDialog,
    });
  };

  const onSubmit = (data) => {
    const { id } = data;
    const createId = uuidv4();
    if (!id) setPatientId(createId);
    data = {
      ...data,
      avatar: avatar,
      id: patientId ? patientId : createId,
    };
    dispatch(savePatient(data));
    toast.success("Lưu thông tin thành công");
  };

  return (
    <>
      <Modal
        show={true}
        onHide={() =>
          setShowPatientForm({
            isShow: false,
            id: null,
          })
        }
        backdrop="static"
        keyboard={false}
        size="lg"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bệnh nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Container>
                {/* Avatar */}
                <Row>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <div className={cx("avatar", "position-relative")}>
                      <img
                        src={
                          avatar
                            ? avatar
                            : getValues("gender") === 0
                            ? femaleAvatar
                            : maleAvatar
                        }
                        alt="Avatar"
                        className="img-fluid"
                      />
                      <div
                        className={cx(
                          "actions",
                          "d-flex align-items-center position-absolute"
                        )}
                      >
                        <label
                          htmlFor="inputAvatar"
                          className={cx("action-item")}
                        >
                          {isMobileDevide ? (
                            <RiCamera3Line />
                          ) : (
                            <RiComputerLine />
                          )}
                        </label>

                        <input
                          className="d-none"
                          id="inputAvatar"
                          type="file"
                          // capture="environment"
                          // accept="image/*"
                          {...register("avatar")}
                          onChange={(e) => onChangeAvatar(e)}
                        />

                        {isMobileDevide || (
                          <label
                            htmlFor="inputAvatarCamera"
                            className={cx("action-item")}
                            onClick={() => {
                              if (
                                "mediaDevices" in navigator &&
                                "getUserMedia" in navigator.mediaDevices
                              ) {
                                setShowStream(true);
                              }
                            }}
                          >
                            <RiCamera3Line />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </Row>

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

                {/* PID, Create Date */}
                <Row className="g-md-0">
                  <Col xs={12} md={6} className="pe-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label htmlFor="pid" className="me-2 my-0 form-label">
                          PID
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <input
                          type="text"
                          className="form-control"
                          id="pid"
                          {...register("pid")}
                          disabled
                        ></input>
                      </Col>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="ps-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="createDate"
                          className="me-2 my-0 form-label"
                        >
                          Ngày tạo
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <input
                          type="text"
                          className="form-control"
                          id="createDate"
                          {...register("createDate")}
                          disabled
                        ></input>
                      </Col>
                    </div>
                  </Col>
                </Row>

                {/* Ho ten */}
                <Row>
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2}>
                      <label
                        htmlFor="fullname"
                        className="me-2 my-0 form-label"
                      >
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
                          onBlur: (e) =>
                            setValue("fullname", e.target.value.trim()),
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

                {/* Ngay sinh, gioi tinh */}
                <Row className="g-md-0">
                  <Col xs={12} md={6} className="pe-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label htmlFor="dob" className="me-2 my-0 form-label">
                          Ngày sinh
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <DatePicker id="dob" />
                      </Col>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="ps-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="gender"
                          className="me-2 my-0 form-label"
                        >
                          Giới tính
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <select
                          id="gender"
                          {...register("gender", {
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
                            --Lựa chọn giới tính--
                          </option>
                          <option value={1}>Nam</option>
                          <option value={0}>Nữ</option>
                        </select>
                        {errors.gender && (
                          <span className="text-danger fst-italic fs-6">
                            Trường này là bắt buộc!
                          </span>
                        )}
                      </Col>
                    </div>
                  </Col>
                </Row>

                {/* Địa chỉ */}
                <Row>
                  <div className="d-flex align-items-center mb-2">
                    <Col xs={2}>
                      <label htmlFor="address" className="me-2 my-0 form-label">
                        Địa chỉ
                      </label>
                    </Col>
                    <Col xs={10}>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        {...register("address", {
                          required: true,
                          onBlur: (e) =>
                            setValue("address", e.target.value.trim()),
                        })}
                      ></input>
                      {errors.address && (
                        <span className="text-danger fst-italic fs-6">
                          Trường này là bắt buộc!
                        </span>
                      )}
                    </Col>
                  </div>
                </Row>

                {/* Dân tộc, Tôn giáo */}
                <Row className="g-md-0">
                  <Col xs={12} md={6} className="pe-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="ethnic"
                          className="me-2 my-0 form-label"
                        >
                          Dân tộc
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="ethnic"
                            {...register("ethnic", {
                              required: false,
                              onBlur: (e) =>
                                setValue("ethnic", e.target.value.trim()),
                            })}
                          ></input>
                        </div>
                      </Col>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="ps-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="religion"
                          className="me-2 my-0 form-label"
                        >
                          Tôn giáo
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          id="religion"
                          {...register("religion", {
                            required: false,
                            onBlur: (e) =>
                              setValue("religion", e.target.value.trim()),
                          })}
                        ></input>
                      </Col>
                    </div>
                  </Col>
                </Row>

                {/* Quốc tịch, CCCD */}
                <Row className="g-md-0">
                  <Col xs={12} md={6} className="pe-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="nationality"
                          className="me-2 my-0 form-label"
                        >
                          Quốc tịch
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="nationality"
                            {...register("nationality", {
                              required: false,
                              onBlur: (e) =>
                                setValue("nationality", e.target.value.trim()),
                            })}
                          ></input>
                        </div>
                      </Col>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="ps-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label htmlFor="cccd" className="me-2 my-0 form-label">
                          CCCD/HC
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          id="cccd"
                          {...register("cccd", {
                            required: false,
                            onBlur: (e) =>
                              setValue("cccd", e.target.value.trim()),
                          })}
                        ></input>
                      </Col>
                    </div>
                  </Col>
                </Row>

                {/* SĐT Liên hệ */}
                <Row className="g-md-0">
                  <Col xs={12} md={6} className="pe-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label htmlFor="phone" className="me-2 my-0 form-label">
                          SĐT
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="phone"
                            {...register("phone", {
                              required: false,
                              onBlur: (e) =>
                                setValue("phone", e.target.value.trim()),
                            })}
                          ></input>
                        </div>
                      </Col>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="ps-md-2">
                    <div className="d-flex align-items-center mb-2">
                      <Col xs={2} md={4}>
                        <label
                          htmlFor="otherPhone"
                          className="me-2 my-0 form-label"
                        >
                          SĐT khác
                        </label>
                      </Col>
                      <Col xs={10} md={8} className="ps-md-1">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          id="otherPhone"
                          {...register("otherPhone", {
                            required: false,
                            onBlur: (e) =>
                              setValue("otherPhone", e.target.value.trim()),
                          })}
                        ></input>
                      </Col>
                    </div>
                  </Col>
                </Row>

                {/* Submit */}
                <Row className="mt-2">
                  <Col xs={12} sm={6} md={3}>
                    {Boolean(watch("id")) && (
                      <div className="mb-2 d-flex align-items-center justify-content-center">
                        <Button
                          className="px-2"
                          variant="danger"
                          onClick={() =>
                            handleDeletePatient(patientAfterCreate)
                          }
                        >
                          <BsFillPersonXFill className="me-2 fs-5" />
                          <span>Xóa BN</span>
                        </Button>
                      </div>
                    )}
                  </Col>

                  <Col xs={12} sm={6} md={3}>
                    {avatar && (
                      <div className="mb-2 d-flex align-items-center justify-content-center">
                        <Button
                          className="px-2"
                          onClick={() => setAvatar(null)}
                        >
                          <TbPhotoOff className="me-2 fs-5" />
                          <span>Xóa ảnh</span>
                        </Button>
                      </div>
                    )}
                  </Col>

                  <Col xs={12} sm={6} md={3}>
                    <div className="mb-2 d-flex align-items-center justify-content-center">
                      <Button
                        className="px-2"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        <FaRegAddressCard className="me-2 fs-5" />
                        <span>New</span>
                      </Button>
                    </div>
                  </Col>

                  <Col xs={12} sm={6} md={3}>
                    {" "}
                    <div className="mb-2 d-flex align-items-center justify-content-center">
                      <Button type="submit" className="px-2">
                        <FaSave className="me-2 fs-5" />
                        <span>Lưu</span>
                      </Button>
                    </div>
                  </Col>
                </Row>

                <Row></Row>
              </Container>
            </form>
          </FormProvider>

          <Container>
            <hr className="w-100"></hr>
          </Container>

          <Container>
            <Row>
              <MedicalVisits
                patientId={patientId}
                handleDeleteVisit={handleDeleteVisit}
              />
            </Row>
          </Container>
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

      {showStream && (
        <MediaStream setShowStream={setShowStream} setAvatar={setAvatar} />
      )}
    </>
  );
}

export default memo(PatientForm);
