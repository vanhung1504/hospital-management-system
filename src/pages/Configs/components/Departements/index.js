import { useCallback, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dialog from "~/components/Dialog";
import {
  delDepartement,
  saveDepatement,
} from "~/store/features/systemConfigs/departmentsSlice";
import Departements from "./DepartementsTable.js";

function DepartementsList() {
  // Dialog
  const [dialog, setDialog] = useState({
    isShow: false,
  });

  const inputRef = useRef();
  const [input, setInput] = useState({
    id: null,
    value: "",
  });

  const dispatch = useDispatch();
  const data = [...useSelector((state) => state.departments)]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => ({ index: index + 1, ...item }));

  const handleSaveDepatement = (input) => {
    if (input.value.trim() !== "") {
      dispatch(saveDepatement(input));
      toast.success(`Lưu thành công: ${input.value}`);
      setInput({
        id: null,
        value: "",
      });
      inputRef.current.focus();
    }
  };

  const handleDelDepartement = useCallback(
    (row) => {
      const deleteDepartment = (bool) => {
        if (bool) {
          dispatch(delDepartement(row.id));
          toast.success(`Xóa thành công: ${row.name}`);
          setDialog({
            isShow: false,
          });
        } else {
          setDialog({
            isShow: false,
          });
        }
      };

      setDialog({
        isShow: true,
        title: "Thông báo!",
        content: `Bạn chắc chắn muốn xóa ${row.name} chứ?`,
        modalConfirm: "modalYesNo",
        handleModal: deleteDepartment,
      });
    },
    [dispatch]
  );

  const handleEditDepartment = useCallback(
    (row) => () => {
      inputRef.current.focus();
      setInput({
        id: row.id,
        value: row.name,
      });
    },
    []
  );

  const handleInputChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      id: e.target.value.length === 0 ? null : prevInput.id,
      value: e.target.value,
    }));
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <InputGroup className="mb-2">
            <Form.Control
              placeholder="Thêm tên khoa phòng tại đây"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={input.value}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleSaveDepatement(input);
              }}
            >
              {input.id === null ? "Thêm" : "Lưu"}
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mx-auto">
          <Departements
            data={data}
            handleDelDepartement={handleDelDepartement}
            handleEditDepartment={handleEditDepartment}
          />
        </Col>
      </Row>

      {dialog.isShow && (
        <Dialog
          title={dialog.title}
          content={dialog.content}
          modalConfirm={dialog.modalConfirm}
          handleModal={dialog.handleModal}
        />
      )}
    </Container>
  );
}

export default DepartementsList;
