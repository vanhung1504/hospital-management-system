import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillDelete, AiFillSave } from "react-icons/ai";
import { CgTikcode } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  barcodeGeneration,
  deleteBarcode,
  saveResult,
} from "~/store/features/laboratory/laboratorySlice";

function XNTable({ select, setSelect }) {
  const [selected, setSelected] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    setSelected([]);
  }, [select]);

  const cls = useSelector((state) => state.healthCareServices.clsXN.data);
  const { clsXN } = select.data;
  const rows = useMemo(() => {
    return clsXN
      .map((item) => ({
        id: item.serviceId,
        name: ((id) => cls.find((xn) => xn.id === id).name)(item.serviceId),
        result: item.result,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, index) => ({ ...item, index: index + 1 }));
  }, [cls, clsXN]);

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 20,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên xét nghiệm",
      minWidth: 200,
      flex: 1,
      sortable: false,
    },
    {
      field: "result",
      headerName: "Kết quả",
      align: "center",
      width: 120,
      sortable: false,
      editable: select.type === "noSID" ? false : true,
    },
  ];

  const dispatch = useDispatch();
  const handleBarcodeGeneration = () => {
    if (selected.length > 0) {
      dispatch(
        barcodeGeneration({
          visitId: select.data.visitId,
          patientId: select.data.patientId,
          examDate: select.data.examDate,
          clsXN: selected.map((item) => ({ serviceId: item.id, result: null })),
        })
      );
      toast.success("Cấp mã vạch thành công!");
      if (rows.length === selected.length) {
        setSelect(null);
      }
    }
  };

  const handleDeleteBarcode = () => {
    if (selected.length > 0) {
      const selectedHasResult = selected.filter((item) => Boolean(item.result));
      if (selectedHasResult.length > 0) {
        toast.error(
          "Lỗi. Chỉ có thể hủy mã vạch của xét nghiệm chưa có kết quả!"
        );
      } else {
        dispatch(
          deleteBarcode({
            id: select.data.id,
            data: selected.map((item) => item.id),
          })
        );
        toast.success("Hủy mã vạch thành công!");
        if (rows.length === selected.length) {
          setSelect(null);
        }
      }
    }
  };

  const handleSaveResult = () => {
    if (selected.length > 0) {
      const grid = tableRef.current;
      const data = selected.map((item) => {
        const field = grid
          .querySelector(`[data-id="${item.id}"]`)
          .querySelector(`[data-field="result"]`);
        const rs_1 = field.querySelector(".MuiDataGrid-cellContent");
        const rs_2 = field.querySelector(".MuiInputBase-input");

        const rs = rs_1 ? rs_1.textContent : rs_2.value;

        return {
          id: item.id,
          result: rs ? rs : null,
        };
      });

      dispatch(
        saveResult({
          id: select.data.id,
          data: data,
        })
      );

      toast.success("Lưu kết quả thành công!");
    }
  };

  return (
    <div className="mt-3">
      <Row>
        <h2 className="fs-5 fw-bold">II. XÉT NGHIỆM</h2>
      </Row>

      <Row>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            ref={tableRef}
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            disableSelectionOnClick
            autoHeight
            hideFooter
            onCellClick={(params, event) => {
              if (params.field === "result") {
                const tg = event.target.querySelector(
                  ".MuiDataGrid-cellContent"
                );
                tg &&
                  tg.dispatchEvent(
                    new KeyboardEvent("keydown", {
                      code: "Enter",
                      key: "Enter",
                      charCode: 13,
                      keyCode: 13,
                      view: window,
                      bubbles: true,
                    })
                  );
              }
            }}
            onSelectionModelChange={(ids) => {
              const selectedRowsData = ids.map((id) =>
                rows.find((row) => row.id === id)
              );
              setSelected(selectedRowsData);
            }}
            selectionModel={selected.map((item) => item.id)}
          />
        </Box>
      </Row>

      <Row className="mt-3 d-flex justify-content-between">
        {select.type === "noSID" && (
          <Col>
            <Button
              className="d-flex align-items-center"
              onClick={() => handleBarcodeGeneration()}
            >
              <CgTikcode className="me-1" />
              Cấp SID
            </Button>
          </Col>
        )}

        {select.type === "yesSID" && (
          <>
            <Col>
              <Button
                className="d-flex align-items-center"
                variant="danger"
                onClick={() => handleDeleteBarcode()}
              >
                <AiFillDelete className="me-1" />
                Hủy SID
              </Button>
            </Col>
            <Col>
              <Button
                className="ms-auto d-flex align-items-center"
                variant="success"
                onClick={() => handleSaveResult()}
              >
                <AiFillSave className="me-1" />
                Lưu
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default memo(XNTable);
