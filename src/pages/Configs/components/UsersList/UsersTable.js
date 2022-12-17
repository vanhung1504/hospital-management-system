import { CheckCircle, DoDisturbOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useDebounce from "~/hooks/useDebounce";

function UsersTable({ setShowForm }) {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const debouncedValue = useDebounce(search, 400);

  const users = useSelector((state) => state.users.users);
  const departements = useSelector((state) => state.departments);
  const roles = useSelector((state) => state.roles);
  const { chucDanh, chucVu } = useSelector((state) => state.othersInfo);

  const getRowsRender = () => {
    let rowsWithSearch = [];
    if (search === "") {
      rowsWithSearch = users;
    } else {
      rowsWithSearch = users.filter(
        (user) =>
          user.fullname.toLowerCase().includes(search) ||
          user.userCode.toLowerCase().includes(search)
      );
    }

    const rows = rowsWithSearch.map((user, index) => ({
      ...user,
      index: index + 1,
      departement: ((id) => departements.find((item) => item.id === id))(
        user.departement
      ).name,
      chucDanh: ((id) => chucDanh.find((item) => item.id === id))(user.chucDanh)
        .name,
      chucVu: ((id) => chucVu.find((item) => item.id === id))(user.chucVu).name,
      roles: ((arr) =>
        arr.map((item) => roles.find((role) => role.id === item).name))(
        user.roles
      ),
    }));

    return rows;
  };

  useEffect(() => {
    setRows(getRowsRender());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, users]);

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
      renderCell: (params) => {
        return (
          <Button
            className="btn-rounded"
            onClick={() =>
              setShowForm({
                isShow: true,
                userId: params.row.id,
              })
            }
          >
            Xem
          </Button>
        );
      },
    },

    {
      field: "userStatus",
      headerName: "Active",
      width: 20,
      align: "center",
      renderCell: (params) => {
        return params.row.userStatus ? (
          <CheckCircle className="text-success" />
        ) : (
          <DoDisturbOff className="text-danger" />
        );
      },
    },
    {
      field: "userCode",
      headerName: "Mã NV",
      width: 100,
    },
    {
      field: "fullname",
      headerName: "Họ tên",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "departement",
      headerName: "Bộ phận",
      width: 180,
    },
    {
      field: "chucDanh",
      headerName: "Chức danh",
      width: 150,
    },
    {
      field: "chucVu",
      headerName: "Chức vụ",
      width: 150,
    },
    {
      field: "username",
      headerName: "Tên đăng nhập",
      width: 100,
    },
    {
      field: "roles",
      headerName: "Phân quyền",
      width: 200,
    },
  ];

  return (
    <Container>
      <Row>
        <Col xs={6} md={9} lg={10}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Tìm kiếm theo Họ tên/Mã NV"
              onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            />
          </InputGroup>
        </Col>
        <Col xs={6} md={3} lg={2} className="d-flex justify-content-end">
          <Button
            className="mb-3"
            onClick={() =>
              setShowForm({
                isShow: true,
                userId: null,
              })
            }
          >
            Thêm mới
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
            <DataGrid rows={rows} columns={columns} autoHeight />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(UsersTable);
