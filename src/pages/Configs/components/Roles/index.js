import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Roles({ mdColumns, canSelect, handleRoles, defaultSelect = [] }) {
  const [selectedRowID, setSelectedRowID] = useState(defaultSelect);

  let rows = useSelector((state) => state.roles);

  // useEffect(() => {
  //   setRows(getRowsRender());
  //   console.log(selectedRowID);
  // }, [selectedRowID]);

  // const getRowsRender = () => {};

  rows = rows.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Quyền truy cập",
      flex: 1,
    },
  ];

  return (
    <Container className={mdColumns === undefined ? "p-0" : ""}>
      <Row className="justify-content-center">
        <Col xs={12} md={mdColumns}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={canSelect}
              onSelectionModelChange={
                canSelect === undefined
                  ? () => {}
                  : (ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRowData = rows
                        .filter((row) => selectedIDs.has(row.id.toString()))
                        .map((item) => item.id);
                      setSelectedRowID(selectedRowData);
                      handleRoles(selectedRowData);
                    }
              }
              selectionModel={selectedRowID}
            />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Roles);
