import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useMemo, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formatToCurrency } from "~/store/features/functions";
import { getClsXNbyVisitId } from "~/store/features/laboratory/laboratorySlice";

function OtherServicesForm({ servicesSelected, setServicesSelected, visitId }) {
  const [search, setSearch] = useState("");

  const services = useSelector((state) => state.healthCareServices);
  const result = useSelector(getClsXNbyVisitId(visitId));
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
            lock: ((key, id) => {
              if (key === "clsXN") {
                const index = result.findIndex((rs) => rs.serviceId === id);
                if (index === -1) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })(key, data[i].id),
          });
        }
      }
    }

    return otherServices;
  }, [services, result]);

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
    <div>
      <Row className="mt-2">
        <Col>
          <InputGroup className="mb-2">
            <Form.Control
              autoFocus
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
              isRowSelectable={(params) => params.row.lock === false}
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
    </div>
  );
}

export default memo(OtherServicesForm);
