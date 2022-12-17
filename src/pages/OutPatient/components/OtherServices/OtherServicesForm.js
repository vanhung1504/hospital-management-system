import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useMemo, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formatToCurrency } from "~/store/features/functions";

function OtherServicesForm({ servicesSelected, setServicesSelected }) {
  const [search, setSearch] = useState("");

  const services = useSelector((state) => state.healthCareServices);
  const rows = useMemo(() => {
    const otherServices = [];
    let index = 0;
    for (const key of Object.keys(services)) {
      if (key !== "goiKham") {
        const data = [...services[key].data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        for (let i = 0; i < data.length; ++i) {
          index++;
          otherServices.push({
            id: `${key}@${data[i].id}`,
            index: index,
            phanNhom: services[key].name,
            name: data[i].name,
            price: formatToCurrency(data[i].price),
          });
        }
      }
    }

    return otherServices;
  }, [services]);

  // console.log(servicesSelected);

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
    },
    {
      field: "phanNhom",
      headerName: "Nhóm",
      width: 200,
    },
    {
      field: "name",
      headerName: "Tên dịch vụ",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Giá (VNĐ)",
      width: 100,
    },
  ];

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <InputGroup className="mb-2">
            <Form.Control
              placeholder="Tìm kiếm dịch vụ"
              onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Box
            sx={{
              height: 300,
              width: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={true}
              disableSelectionOnClick
              filterModel={{
                items: [
                  {
                    columnField: "name",
                    operatorValue: "contains",
                    value: search,
                  },
                ],
              }}
              onSelectionModelChange={(ids) => {
                setServicesSelected(ids);
                // handleSelectServices(ids);
              }}
              selectionModel={servicesSelected}
            />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(OtherServicesForm);
