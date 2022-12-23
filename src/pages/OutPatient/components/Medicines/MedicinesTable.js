import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UNITS } from "~/pages/Configs/components/Medicines/units";
import { deleteMedicine } from "~/store/features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";

function MedicinesTable({ visitId, medicines, setLock, setMedId, setDialog }) {
  const medicinesList = useSelector((state) => state.medicines);

  const dispatch = useDispatch();
  const handleDeleteMedicine = (row) => {
    const handleConfirm = (bool) => {
      if (bool) {
        dispatch(
          deleteMedicine({
            visitId: visitId,
            id: row.id,
          })
        );
        toast.success(`Xóa thành công!`);
      }

      setDialog({
        isShow: false,
      });
    };

    setDialog({
      isShow: true,
      title: "Thông báo!",
      content: `Xóa thuốc ${row.name}?`,
      modalConfirm: "modalYesNo",
      handleModal: handleConfirm,
    });
  };

  const rows = medicines.map((drug, index) => {
    return {
      id: drug.medicineId,
      index: index + 1,
      name: ((id) => medicinesList.find((item) => item.id === id).name)(
        drug.medicineId
      ),
      howUse: `${drug.route} ${drug.amount} x ${drug.frequency} vào ${drug.time}`,
      quantity: drug.quantity,
      unit: ((value) => UNITS.find((item) => +item.value === +value)?.name)(
        drug.unit
      ),
    };
  });

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    {
      field: "name",
      headerName: "Tên thuốc",
      minWidth: 300,
      flex: 1,
      renderCell: ({ row }) => (
        <div className="d-flex flex-column py-1">
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            {row.name}
          </p>
          <p className="fst-italic" style={{ fontSize: "12px" }}>
            {row.howUse}
          </p>
        </div>
      ),
    },
    {
      field: "quantity",
      headerName: "SL",
      width: 100,
      renderCell: ({ row }) => (
        <>
          <strong>{row.quantity}</strong> &nbsp; {row.unit}
        </>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<Delete className="text-danger" />}
          label="Delete"
          onClick={() => {
            handleDeleteMedicine(row);
          }}
        />,
        <GridActionsCellItem
          icon={<Edit className="text-primary" />}
          label="Edit"
          onClick={() => {
            setLock(false);
            setMedId(row.id);
          }}
        />,
      ],
    },
  ];

  return (
    <div>
      <Row className="mt-2">
        <Col className="mb-2">
          <Box
            sx={{
              width: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              getRowHeight={() => "auto"}
              hideFooter
            />
          </Box>
        </Col>
      </Row>
    </div>
  );
}

export default memo(MedicinesTable);
