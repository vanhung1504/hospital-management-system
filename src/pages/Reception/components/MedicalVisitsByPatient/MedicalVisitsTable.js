import {
  CheckCircle,
  Delete,
  Edit,
  LocalHospital,
  Warning,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SiAddthis } from "react-icons/si";
import { useSelector } from "react-redux";
import { getMedicalVisitByPatientId } from "~/store/features/medicalVisits/medicalVisitsSlice";

function MedicalVisitsTable({
  patientId,
  formInput,
  setFormInput,
  handleDeleteVisit,
}) {
  const departements = useSelector((state) => state.departments);
  const goiKham = useSelector((state) => state.healthCareServices.goiKham.data);
  const visitHistory = useSelector(getMedicalVisitByPatientId(patientId));
  const rows = visitHistory.map((item, index) => ({
    ...item,
    index: index + 1,
    depId: ((id) => departements.find((item) => item.id === id))(item.depId)
      .name,
    content: ((id) => goiKham.find((item) => item.id === id))(item.content)
      .name,
  }));

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 20,
      align: "center",
      renderCell: (params) => {
        return params.row.status === -1 ? (
          <Warning className="text-danger" />
        ) : params.row.status === 0 ? (
          <LocalHospital className="text-info" />
        ) : params.row.status === 1 ? (
          <LocalHospital className="text-warning" />
        ) : (
          <CheckCircle className="text-success" />
        );
      },
    },
    {
      field: "createDate",
      headerName: "Thời gian",
      width: 160,
    },
    {
      field: "content",
      headerName: "Nội dung khám",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "depId",
      headerName: "Nơi khám",
      width: 160,
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
          style={{ opacity: row.status === -1 ? "1" : "0" }}
          disabled={row.status === -1 ? false : true}
          onClick={() => {
            handleDeleteVisit(row);
          }}
        />,
        <GridActionsCellItem
          icon={<Edit className="text-primary" />}
          label="Edit"
          onClick={() => {
            setFormInput({ isShow: true, id: row.id });
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <Container className="mb-2">
        <Row className="align-items-center justify-content-between">
          <Col xs={12} sm={6}>
            <h5 className="fw-bold m-0">Lịch sử khám bệnh:</h5>
          </Col>
          <Col
            xs={12}
            sm={6}
            className="d-flex justify-content-end align-items-center"
          >
            {!formInput.isShow && (
              <Button
                className="d-flex justify-content-center align-items-center"
                onClick={() => setFormInput({ isShow: true, id: null })}
              >
                <SiAddthis className="text-white me-2" />
                <span>Thêm</span>
              </Button>
            )}
          </Col>
        </Row>
      </Container>

      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}

export default memo(MedicalVisitsTable);
