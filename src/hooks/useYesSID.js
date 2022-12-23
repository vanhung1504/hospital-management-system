import { useSelector } from "react-redux";
import { format } from "date-fns";
import { stringToDate } from "~/store/features/functions";
import { useMemo } from "react";

function useYesSID(
  fromTime = format(new Date(), "dd/MM/yyy"),
  toTime = format(new Date(), "dd/MM/yyy")
) {
  const laboData = useSelector((state) => state.laboratory.data);

  const rs_1 = useMemo(() => {
    return laboData.filter((item) => {
      const newFromTime = new Date(
        stringToDate(fromTime, "dd/MM/yyyy", "/", ":")
      ).getTime();
      const newToTime =
        new Date(stringToDate(toTime, "dd/MM/yyyy", "/", ":")).getTime() +
        86400000;
      const examTime = new Date(item?.examDate).getTime();
      return examTime >= newFromTime && examTime < newToTime;
    });
  }, [laboData, fromTime, toTime]);

  return rs_1;
}

export default useYesSID;
