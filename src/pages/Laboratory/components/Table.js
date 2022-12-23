import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import femaleAvatar from "~/assets/images/Reception/femaleAvatar.png";
import maleAvatar from "~/assets/images/Reception/maleAvatar.png";
import useDebounce from "~/hooks/useDebounce";

function Table({ data, handleClickView }) {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [rows, setRows] = useState([]);

  const patients = useSelector((state) => state.patients.patients);
  const dataList = data.map((item, index) => {
    const patient = patients.find((patient) => patient.id === item.patientId);

    return {
      id: item.id,
      index: index + 1,
      sid: item?.sid,
      avatar: patient?.avatar,
      pid: patient?.pid,
      fullname: patient?.fullname,
      dob: patient?.dob,
      gender: +patient?.gender === 0 ? "Nữ" : "Nam",
      address: patient?.address,
    };
  });

  const getRowsRender = () => {
    let rowsWithSearch = [];
    if (search === "") {
      rowsWithSearch = dataList;
    } else {
      rowsWithSearch = dataList.filter(
        (item) =>
          item?.fullname.toLowerCase()?.includes(search) ||
          item?.pid?.includes(search) ||
          item?.sid?.includes(search)
      );
    }

    return rowsWithSearch;
  };

  useEffect(() => {
    setRows(getRowsRender());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, data]);

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
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Button
          className="btn-rounded"
          onClick={() => handleClickView(params.row.id)}
        >
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
      field: "sid",
      headerName: "SID",
      width: 80,
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
      minWidth: 160,
      flex: 1,
    },
  ];

  return (
    <>
      <InputGroup className="mb-3 mt-2">
        <Form.Control
          placeholder="Tìm kiếm bệnh nhân theo Họ tên/PID/SID"
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        />
      </InputGroup>
      <Box
        sx={{
          width: "100%",
          height: 300,
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}

export default memo(Table);
