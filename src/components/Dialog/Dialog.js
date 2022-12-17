import { memo } from "react";
import { Button, Modal } from "react-bootstrap";

function Dialog({
  title = "Modal title",
  content = "Modal content",
  modalConfirm = "modalYesNo",
  handleModal = (bool) => bool,
}) {
  const backgroundColor = "#00ffff";
  const colorText = "#000";
  const borderTopBottom = "1px solid #fffbf4";

  return (
    <Modal
      show={true}
      onHide={() => handleModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: backgroundColor,
          color: colorText,
          borderBottom: borderTopBottom,
        }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ backgroundColor: backgroundColor, color: colorText }}
      >
        {content}
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: backgroundColor,
          color: colorText,
          borderTop: borderTopBottom,
        }}
      >
        {modalConfirm === "modalNo" ? (
          <Button variant="secondary" onClick={() => handleModal(false)}>
            Hủy bỏ
          </Button>
        ) : (
          ""
        )}

        {modalConfirm === "modalYesNo" ? (
          <Button variant="secondary" onClick={() => handleModal(false)}>
            Hủy bỏ
          </Button>
        ) : (
          ""
        )}

        {modalConfirm === "modalYes" ? (
          <Button variant="primary" onClick={() => handleModal(true)}>
            Đồng ý
          </Button>
        ) : (
          ""
        )}

        {modalConfirm === "modalYesNo" ? (
          <Button variant="primary" onClick={() => handleModal(true)}>
            Đồng ý
          </Button>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default memo(Dialog);
