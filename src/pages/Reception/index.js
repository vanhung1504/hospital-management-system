import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import MainLayout from "~/components/MainLayout";
import MedicalVisits from "~/components/MedicalVisits";
import PatientForm from "./components/PatientForm";
import PatientsTable from "./components/PatientsTable";

function Reception() {
  const [showPatientForm, setShowPatientForm] = useState({
    isShow: false,
    id: null,
  });
  const [keyActive, setKeyActive] = useState("patients");
  const [firstRender, setFirstRender] = useState(true);

  return (
    <MainLayout title="Tiếp đón bệnh nhân">
      <Container className="pt-2">
        <Tabs
          id="tabs-control"
          activeKey={keyActive}
          onSelect={(k) => {
            if (firstRender) setFirstRender(false);
            setKeyActive(k);
          }}
        >
          <Tab eventKey="patients" title="Danh sách BN">
            <PatientsTable setShowPatientForm={setShowPatientForm} />
          </Tab>
          <Tab eventKey="medical-visits" title="Lượt khám">
            {firstRender || (
              <MedicalVisits
                depRequired={false}
                onClickView={(params) =>
                  setShowPatientForm({ isShow: true, id: params.row.patientId })
                }
              />
            )}
          </Tab>
        </Tabs>
      </Container>

      {showPatientForm.isShow && (
        <PatientForm
          id={showPatientForm.id}
          setShowPatientForm={setShowPatientForm}
        />
      )}
    </MainLayout>
  );
}

export default Reception;
