import { memo, useState } from "react";
import MedicalVisitForm from "./MedicalVisitForm";
import MedicalVisitsTable from "./MedicalVisitsTable";

function MedicalVisits({ patientId, handleDeleteVisit }) {
  const [formInput, setFormInput] = useState({ isShow: false, id: null });
  return (
    <>
      {formInput.isShow && (
        <MedicalVisitForm
          patientId={patientId}
          formInput={formInput}
          setFormInput={setFormInput}
        />
      )}
      <MedicalVisitsTable
        patientId={patientId}
        formInput={formInput}
        setFormInput={setFormInput}
        handleDeleteVisit={handleDeleteVisit}
      />
    </>
  );
}

export default memo(MedicalVisits);
