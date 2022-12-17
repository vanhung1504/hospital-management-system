import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaRegAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import femaleAvatar from "~/assets/images/Reception/femaleAvatar.png";
import maleAvatar from "~/assets/images/Reception/maleAvatar.png";
import useDebounce from "~/hooks/useDebounce";

function PatientsTable({ setShowPatientForm }) {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const patients = useSelector((state) => state.patients.patients);

  const getRowsRender = () => {
    let rowsWithSearch = [];
    if (search === "") {
      rowsWithSearch = patients;
    } else {
      rowsWithSearch = patients.filter(
        (patient) =>
          patient.fullname.toLowerCase().includes(search) ||
          patient.pid.includes(search) ||
          patient.phone.includes(search) ||
          patient.cccd.includes(search)
      );
    }

    const newRowsWithSearch = [...rowsWithSearch];

    newRowsWithSearch.sort((a, b) => a.fullname.localeCompare(b.fullname));

    const rows = newRowsWithSearch.map((patient, index) => ({
      ...patient,
      index: index + 1,
      gender: +patient.gender === 0 ? "Nữ" : "Nam",
    }));

    return rows;
  };

  useEffect(() => {
    setRows(getRowsRender());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, patients]);

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            className="btn-rounded"
            onClick={() =>
              setShowPatientForm({
                isShow: true,
                id: params.row.id,
              })
            }
          >
            Xem
          </Button>
        );
      },
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const { avatar, gender } = params.row;
        return (
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              width: "45px",
              height: "45px",
            }}
          >
            <img
              src={
                avatar ? avatar : gender === "Nữ" ? femaleAvatar : maleAvatar
              }
              alt="Avatar"
              className="img-fluid"
            />
          </div>
        );
      },
    },
    {
      field: "pid",
      headerName: "PID",
      width: 100,
    },
    {
      field: "fullname",
      headerName: "Họ tên",
      width: 200,
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Giới",
      width: 50,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 100,
    },
    {
      field: "cccd",
      headerName: "CCCD/CMND",
      width: 120,
    },
  ];

  return (
    <>
      <Row className="mt-2">
        <Col xs={6} md={9} lg={10}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Tìm kiếm bệnh nhân theo Họ tên/PID/CCCD/SĐT"
              onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            />
          </InputGroup>
        </Col>
        <Col xs={6} md={3} lg={2} className="d-flex justify-content-end">
          <Button
            className="mb-3"
            onClick={() =>
              setShowPatientForm({
                isShow: true,
                id: null,
              })
            }
          >
            <FaRegAddressCard className="me-2 fs-5" />
            <span>Thêm mới</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <DataGrid rows={rows} columns={columns} autoHeight={true} />
          </Box>
        </Col>
      </Row>
    </>
  );
}

export default memo(PatientsTable);
