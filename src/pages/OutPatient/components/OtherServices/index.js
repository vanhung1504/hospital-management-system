import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getMedicalVisitMetaInfoById } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";
import OtherServicesActions from "./OtherServicesActions";
import OtherServicesForm from "./OtherServicesForm";
import OtherServicesView from "./OtherServicesView";

function OtherServices({ visitId }) {
  const [lock, setLock] = useState(true);
  const [servicesSelected, setServicesSelected] = useState([]);

  const otherServices = useSelector(
    getMedicalVisitMetaInfoById(visitId)
  )?.otherServices;
  const transformOtherServices = useMemo(() => {
    const otherServicesArr = [];

    if (otherServices) {
      for (const key of Object.keys(otherServices)) {
        for (let i = 0; i < otherServices[key].length; ++i) {
          otherServicesArr.push(`${key}@${otherServices[key][i]}`);
        }
      }
    }

    return otherServicesArr;
  }, [otherServices]);

  useEffect(() => {
    setServicesSelected(transformOtherServices);
  }, [transformOtherServices]);

  return (
    <>
      <OtherServicesActions
        lock={lock}
        setLock={setLock}
        visitId={visitId}
        servicesSelected={servicesSelected}
      />

      {lock || (
        <OtherServicesForm
          servicesSelected={servicesSelected}
          setServicesSelected={setServicesSelected}
        />
      )}

      {otherServices && <OtherServicesView otherServices={otherServices} />}
    </>
  );
}

export default memo(OtherServices);
