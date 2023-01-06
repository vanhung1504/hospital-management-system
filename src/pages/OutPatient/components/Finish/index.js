import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FinishActions from "./FinishActions";
import FinishForm from "./FinishForm";
import FinishView from "./FinishView";

function Finish({ visitId }) {
  const [lock, setLock] = useState(true);
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <FinishActions lock={lock} setLock={setLock} visitId={visitId} />
          {lock || <FinishForm visitId={visitId} />}
        </form>
      </FormProvider>
      <FinishView visitId={visitId} />
    </>
  );
}

export default memo(Finish);
