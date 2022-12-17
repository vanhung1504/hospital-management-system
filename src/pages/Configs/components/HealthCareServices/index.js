import { useCallback, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dialog from "~/components/Dialog";
import { deleteService } from "~/store/features/systemConfigs/healthCareServicesSlice";
import HealthCareServicesForm from "./HealthCareServicesForm";
import HealthCareServicesTable from "./HealthCareServicesTable";

function HealthCareServices() {
  const [dialog, setDialog] = useState({
    isShow: false,
  });

  const dispatch = useDispatch();
  const handleDeleteService = useCallback(
    ({ serviceKey, row }) => {
      const deleteServiceDialog = (bool) => {
        if (bool) {
          dispatch(deleteService({ serviceKey, id: row.id }));
          toast.success(`Xóa thành công dịch vụ: ${row.name}`);
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
        content: `Bạn chắc chắn muốn xóa dịch vụ ${row.name} chứ?`,
        modalConfirm: "modalYesNo",
        handleModal: deleteServiceDialog,
      });
    },
    [dispatch]
  );

  const [service, setService] = useState({ serviceKey: null, id: null });
  const services = useSelector((state) => state.healthCareServices);
  const servicesComp = [];
  for (const key of Object.keys(services)) {
    servicesComp.push(
      <Accordion.Item eventKey={key} key={key}>
        <Accordion.Header
          onClick={() => setService((prev) => ({ serviceKey: key, id: null }))}
        >
          {services[key].name}
        </Accordion.Header>
        <Accordion.Body className="p-0 pt-2">
          {service.serviceKey && service.serviceKey === key && (
            <>
              <HealthCareServicesForm
                service={service}
                setService={setService}
              />
              <HealthCareServicesTable
                serviceKey={service.serviceKey}
                setService={setService}
                handleDeleteService={handleDeleteService}
              />
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={8} className="mx-auto">
          <Accordion>{servicesComp}</Accordion>
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

export default HealthCareServices;
