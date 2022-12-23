import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { getMedicalVisitMetaInfoById } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";
import MedicinesActions from "./MedicinesActions";
import MedicinesForm from "./MedicinesForm";
import MedicinesTable from "./MedicinesTable";

function Medicines({ visitId, setDialog }) {
  const [lock, setLock] = useState(true);
  const [medId, setMedId] = useState(null);
  const medicines = useSelector(
    getMedicalVisitMetaInfoById(visitId)
  )?.medicines;

  return (
    <>
      <MedicinesActions lock={lock} setLock={setLock} setMedId={setMedId} />

      {lock || (
        <MedicinesForm
          visitId={visitId}
          medId={medId}
          medicines={medicines}
          setLock={setLock}
        />
      )}

      {medicines && medicines?.length > 0 && (
        <MedicinesTable
          visitId={visitId}
          medicines={medicines}
          setLock={setLock}
          setMedId={setMedId}
          setDialog={setDialog}
        />
      )}
    </>
  );
}

export default memo(Medicines);
