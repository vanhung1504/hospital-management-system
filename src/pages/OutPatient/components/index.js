import { memo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "~/components/Dialog";
import PatientInfo from "~/components/PatientInfo";
import {
  getMedicalVisitById,
  saveVisit,
} from "~/store/features/medicalVisits/medicalVisitsSlice";
import { deleteVisitMetaInfo } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";
import { getPatientById } from "~/store/features/patients/patientsSlice";
import MedicalInquiry from "./MedicalInquiry";
import Medicines from "./Medicines";
import OtherServices from "./OtherServices";
import PhysicalExamination from "./PhysicalExamination";

function MedicalVisitDetail({ visitId }) {
  const userId = useSelector((state) => state.userLoggedIn.id);
  const { status, patientId } = useSelector(getMedicalVisitById(visitId));
  const { pid, fullname, dob } = useSelector(getPatientById(patientId));
  const [dialog, setDialog] = useState({
    isShow: false,
  });
  const dispatch = useDispatch();
  const handleCallPatient = () => {
    const handleConfirm = (bool) => {
      if (bool) {
        if (status === -1) {
          dispatch(
            saveVisit({
              id: visitId,
              status: 0,
              examDate: new Date(),
              userId: userId,
            })
          );
        } else {
          dispatch(
            saveVisit({
              id: visitId,
              status: -1,
              examDate: null,
              userId: null,
            })
          );
          dispatch(deleteVisitMetaInfo(visitId));
        }
      }

      setDialog({
        isShow: false,
      });
    };

    setDialog({
      isShow: true,
      title: "Thông báo!",
      content:
        status === -1
          ? `Gọi bệnh nhân ${pid} - ${fullname} - ${dob}`
          : `Hủy khám bệnh nhân ${pid} - ${fullname} - ${dob}`,
      modalConfirm: "modalYesNo",
      handleModal: handleConfirm,
    });
  };

  return (
    <>
      <Container className="mt-5 mb-3 text-center">
        <Row>
          <div className="text-center fs-3 fw-bold text-primary">
            CHI TIẾT ĐỢT KHÁM
          </div>
        </Row>

        {(status === -1 || status === 0) && (
          <Row>
            <div className="text-center my-2">
              <Button
                className="px-5"
                variant={status === -1 ? "primary" : "warning"}
                onClick={() => handleCallPatient()}
              >
                {status === -1 ? "Gọi khám" : "Hủy khám"}
              </Button>
            </div>
          </Row>
        )}
      </Container>

      <Container>
        <Row>
          <Col lg={8} md={12} className="mx-auto">
            <PatientInfo visitId={visitId} />
            {status !== -1 && (
              <>
                <MedicalInquiry visitId={visitId} />
                <PhysicalExamination visitId={visitId} />
                <OtherServices visitId={visitId} />
                <Medicines visitId={visitId} setDialog={setDialog} />
              </>
            )}
          </Col>
        </Row>
      </Container>

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

export default memo(MedicalVisitDetail);
