import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { memo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

function DepartementsTable({
  data,
  handleDelDepartement,
  handleEditDepartment,
}) {
  const [search, setSearch] = useState("");
  const rows = data;

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<DeleteIcon className="text-danger" />}
          label="Delete"
          onClick={() => handleDelDepartement(row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon className="text-primary" />}
          label="Edit"
          onClick={handleEditDepartment(row)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Tên khoa/phòng",
      flex: 1,
    },
  ];

  return (
    <>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Tìm kiếm khoa/phòng"
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        />
      </InputGroup>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          filterModel={{
            items: [
              {
                columnField: "name",
                operatorValue: "contains",
                value: search,
              },
            ],
          }}
        />
      </Box>
    </>
  );
}

export default memo(DepartementsTable);
