import { CheckCircle, LocalHospital, Warning } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import femaleAvatar from "~/assets/images/Reception/femaleAvatar.png";
import maleAvatar from "~/assets/images/Reception/maleAvatar.png";
import useDebounce from "~/hooks/useDebounce";
import { stringToDate } from "~/store/features/functions";

function Table({ filter, search, onClickView, tableHeight, sortable = true }) {
  const [rows, setRows] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const patients = useSelector((state) => state.patients.patients);
  const departements = useSelector((state) => state.departments);
  const goiKham = useSelector((state) => state.healthCareServices.goiKham.data);
  const visits = useSelector((state) => state.medicalVisits);

  const visitsWithFilter = useMemo(() => {
    const { fromTime, toTime, status, depId } = filter;
    const newFromTime = new Date(
      stringToDate(fromTime, "dd/MM/yyyy", "/", ":")
    ).getTime();
    const newToTime =
      new Date(stringToDate(toTime, "dd/MM/yyyy", "/", ":")).getTime() +
      86400000;
    let result = visits
      .filter((visit) => {
        const visitTime = new Date(visit.createDate).getTime();
        return visitTime >= newFromTime && visitTime < newToTime;
      })
      .filter((visit) => {
        if (String(depId) === "-1") return visit;
        return visit.depId === depId;
      })
      .filter((visit) => {
        if (status === "all") return visit;
        return visit.status === +status;
      })
      .sort(
        (a, b) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
      );

    return result.map((visit, index) => {
      const patient = ((id) => patients.find((item) => item.id === id))(
        visit.patientId
      );

      return {
        ...visit,
        index: index + 1,
        depId: ((id) => departements.find((item) => item.id === id))(
          visit.depId
        ).name,
        content: ((id) => goiKham.find((item) => item.id === id))(visit.content)
          .name,
        pid: patient.pid,
        fullname: patient.fullname,
        avatar: patient.avatar,
        dob: patient.dob,
        gender: +patient.gender === 0 ? "Nữ" : "Nam",
      };
    });
  }, [filter, visits, patients, departements, goiKham]);

  const getRowsRender = () => {
    let rowsWithSearch = [];
    if (search === "") {
      rowsWithSearch = visitsWithFilter;
    } else {
      rowsWithSearch = visitsWithFilter.filter(
        (visit) =>
          visit.fullname.toLowerCase().includes(search) ||
          visit.pid.includes(search)
      );
    }
    return rowsWithSearch;
  };

  useEffect(() => {
    setRows(getRowsRender());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, patients, filter, visits]);

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
      sortable: sortable,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Button className="btn-rounded" onClick={() => onClickView(params)}>
          Xem
        </Button>
      ),
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
      field: "status",
      headerName: "Trạng thái",
      width: 20,
      align: "center",
      sortable: sortable,
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
      headerName: "TGĐK khám",
      width: 160,
      sortable: sortable,
    },
    {
      field: "pid",
      headerName: "PID",
      width: 100,
      sortable: sortable,
    },
    {
      field: "fullname",
      headerName: "Họ tên",
      width: 200,
      sortable: sortable,
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 100,
      sortable: sortable,
    },
    {
      field: "gender",
      headerName: "Giới",
      width: 50,
      sortable: sortable,
    },

    {
      field: "content",
      headerName: "Nội dung",
      minWidth: 160,
      flex: 1,
      sortable: sortable,
    },
    {
      field: "depId",
      headerName: "Nơi khám",
      width: 160,
      sortable: sortable,
    },
  ];

  return (
    <>
      <Row>
        <Col xs={12}>
          <Box
            sx={{
              width: "100%",
              height: tableHeight || 500,
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight={tableHeight ? false : true}
            />
          </Box>
        </Col>
      </Row>
    </>
  );
}

export default memo(Table);
