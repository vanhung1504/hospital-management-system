import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";

function HealthCareServicesTable({
  serviceKey,
  setService,
  handleDeleteService,
}) {
  const [search, setSearch] = useState("");
  const services = [
    ...useSelector((state) => state.healthCareServices)[serviceKey].data,
  ]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => ({ index: index + 1, ...item }));

  const rows = services;

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
          onClick={() => handleDeleteService({ serviceKey, row })}
        />,
        <GridActionsCellItem
          icon={<EditIcon className="text-primary" />}
          label="Edit"
          onClick={() => setService((prev) => ({ ...prev, id: row.id }))}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Tên dịch vụ",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Giá DV (VNĐ)",
      width: 150,
      renderCell: (params) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(params.row.price),
    },
  ];

  return (
    <>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Tìm kiếm dịch vụ"
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

export default memo(HealthCareServicesTable);
