import { memo, useCallback, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Dialog from "~/components/Dialog";
import { deleteMedicine } from "~/store/features/systemConfigs/medicinesSlice";
import MedicineForm from "./MedicineForm";
import MedicinesTable from "./MedicinesTable";

function Medicines() {
  const [dialog, setDialog] = useState({
    isShow: false,
  });

  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const handleDeleteMedicine = useCallback(
    ({ id, name }) => {
      const deleteMedicineDialog = (bool) => {
        if (bool) {
          dispatch(deleteMedicine(id));
          toast.success(`Xóa thành công thuốc: ${name}`);
          setDialog({
            isShow: false,
          });
        } else {
          setDialog({
            isShow: false,
          });
        }
      };

      setDialog({
        isShow: true,
        title: "Thông báo!",
        content: `Bạn chắc chắn muốn xóa thuốc ${name} chứ?`,
        modalConfirm: "modalYesNo",
        handleModal: deleteMedicineDialog,
      });
    },
    [dispatch]
  );

  return (
    <Container>
      <Row>
        <Col lg={8} className="mx-auto">
          <MedicineForm id={id} setId={setId} />
          <MedicinesTable
            setId={setId}
            handleDeleteMedicine={handleDeleteMedicine}
          />
        </Col>
      </Row>

      {dialog.isShow && (
        <Dialog
          title={dialog.title}
          content={dialog.content}
          modalConfirm={dialog.modalConfirm}
          handleModal={dialog.handleModal}
        />
      )}
    </Container>
  );
}

export default memo(Medicines);
