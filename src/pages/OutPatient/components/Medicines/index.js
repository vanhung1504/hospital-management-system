import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getMedicalVisitMetaInfoById } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";
import MedicinesActions from "./MedicinesActions";
import MedicinesForm from "./MedicinesForm";

function Medicines({ visitId }) {
  const [lock, setLock] = useState(false);
  return (
    <>
      <MedicinesActions
        lock={lock}
        setLock={setLock}
        visitId={visitId}
        // servicesSelected={servicesSelected}
      />

      {lock || (
        <MedicinesForm
        //   servicesSelected={servicesSelected}
        //   setServicesSelected={setServicesSelected}
        />
      )}

      {/* {otherServices && <OtherServicesView otherServices={otherServices} />} */}
    </>
  );
}

export default memo(Medicines);
