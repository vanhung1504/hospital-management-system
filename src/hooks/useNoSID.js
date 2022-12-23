import { useSelector } from "react-redux";
import { format } from "date-fns";
import { stringToDate } from "~/store/features/functions";
import { useMemo } from "react";

function useNoSID(
  fromTime = format(new Date(), "dd/MM/yyy"),
  toTime = format(new Date(), "dd/MM/yyy")
) {
  const medicalVisits = useSelector((state) => state.medicalVisits);
  const metaVisits = useSelector((state) => state.medicalVisitsMetaInfo);
  const laboData = useSelector((state) => state.laboratory.data);

  const result = useMemo(() => {
    // Loc luot kham theo thoi gian
    const rs_1 = medicalVisits.filter((item) => {
      const newFromTime = new Date(
        stringToDate(fromTime, "dd/MM/yyyy", "/", ":")
      ).getTime();
      const newToTime =
        new Date(stringToDate(toTime, "dd/MM/yyyy", "/", ":")).getTime() +
        86400000;
      const examTime = new Date(item?.examDate).getTime();
      return examTime >= newFromTime && examTime < newToTime;
    });

    // Loc luot kham co chi dinh clsXN
    const clsXN_1 = [];
    rs_1.forEach((item) => {
      const rs = metaVisits.find((visit) => visit.id === item.id)?.otherServices
        ?.clsXN;

      if (rs) {
        clsXN_1.push({
          ...item,
          clsXN: rs,
        });
      }
    });

    // Loc chi dinh clsXN chua duoc cap ma vach
    let clsXN_2 = [];
    clsXN_1.forEach((item) => {
      const rs_1 = laboData.filter((xn) => xn.visitId === item.id);
      if (rs_1.length === 0) {
        clsXN_2.push(item);
      } else {
        const clsXNItem = item.clsXN;

        let clsXNByVisit = [];
        rs_1.forEach((rs) => {
          clsXNByVisit = [
            ...clsXNByVisit,
            ...rs?.clsXN.map((item) => item.serviceId),
          ];
        });

        const clsResult = [];

        clsXNItem.forEach((item) => {
          const index = clsXNByVisit.findIndex((cls) => cls === item);
          if (index === -1) {
            clsResult.push(item);
          }
        });

        if (clsResult.length > 0) {
          clsXN_2.push({ ...item, clsXN: clsResult });
        }
      }
    });

    return clsXN_2.map((item) => ({
      id: item.id,
      visitId: item.id,
      patientId: item.patientId,
      examDate: item.examDate,
      clsXN: item.clsXN.map((cls) => ({ serviceId: cls, result: null })),
    }));
  }, [medicalVisits, metaVisits, laboData, fromTime, toTime]);

  return result;
}

export default useNoSID;
