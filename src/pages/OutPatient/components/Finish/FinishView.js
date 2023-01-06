import { CheckCircle, LocalHospital } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getMedicalVisitById } from "~/store/features/medicalVisits/medicalVisitsSlice";
import { getDepartementById } from "~/store/features/systemConfigs/departmentsSlice";

function FinishView({ visitId }) {
  const { status, finishAtDate, inPatientDepId } = useSelector(
    getMedicalVisitById(visitId)
  );
  const departement = useSelector(getDepartementById(inPatientDepId))?.name;

  return (
    <div className="mt-2">
      {status === 1 ? (
        <div>
          <LocalHospital className="text-warning" />
          &nbsp;
          <span>Nhập viện</span>
          &nbsp;
          <span className="fw-bold text-uppercase">{departement}</span>
        </div>
      ) : status === 2 ? (
        <div>
          <CheckCircle className="text-success" />
          &nbsp;
          <span>Hoàn tất khám lúc</span>
          &nbsp;
          <span className="fw-bold">{finishAtDate}</span>
        </div>
      ) : status === 0 ? (
        <div>
          <LocalHospital className="text-primary" />
          &nbsp;
          <span>Đang khám...</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FinishView;
