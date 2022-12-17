import { memo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import MainLayout from "~/components/MainLayout";
import MedicalVisits from "~/components/MedicalVisits";
import MedicalVisitDetail from "./components";

function OutPatient() {
  const [visitId, setVisitId] = useState(null);
  const medicalVisitDetailRef = useRef(null);
  const handleTableClickView = (params) => {
    setVisitId(params.row.id);
    visitId &&
      window.scrollTo({
        top: medicalVisitDetailRef.current.offsetTop - 60,
        behavior: "smooth",
      });
  };

  return (
    <MainLayout title="Khám bệnh ngoại trú">
      <Container>
        <MedicalVisits
          depRequired={true}
          onClickView={handleTableClickView}
          tableHeight={300}
          sortable={false}
        />
      </Container>
      {visitId && (
        <div ref={medicalVisitDetailRef}>
          <MedicalVisitDetail visitId={visitId} />
        </div>
      )}

      <div className="p-5"></div>
    </MainLayout>
  );
}

export default memo(OutPatient);
