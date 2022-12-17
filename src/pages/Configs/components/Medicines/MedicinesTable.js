import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { memo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { UNITS } from "./units";

function MedicinesTable({ setId, handleDeleteMedicine }) {
  const [search, setSearch] = useState("");
  const medicines = [...useSelector((state) => state.medicines)]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => ({
      ...item,
      index: index + 1,
      unit: ((value) => UNITS.find((unit) => +unit.value === +value)?.name)(
        item.unit
      ),
    }));

  const rows = medicines;

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
          onClick={() => handleDeleteMedicine(row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon className="text-primary" />}
          label="Edit"
          onClick={() => setId(row.id)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Tên thuốc",
      flex: 1,
    },
    {
      field: "unit",
      headerName: "ĐVT",
      width: 100,
      //   renderCell: (params) =>
      //     new Intl.NumberFormat("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     }).format(params.row.price),
    },
  ];

  return (
    <>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Tìm kiếm thuốc"
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

export default memo(MedicinesTable);
