import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "~/components/Footer";
import GoToTop from "~/components/GoToTop";
import MainLayout from "~/components/MainLayout";
import useNoSID from "~/hooks/useNoSID";
import useYesSID from "~/hooks/useYesSID";
import Detail from "./components/Detail";
import Filter from "./components/Filter";
import Table from "./components/Table";

function Laboratory() {
  const detailRef = useRef(null);
  const [filter, setFilter] = useState({
    fromTime: format(new Date(), "dd/MM/yyyy"),
    toTime: format(new Date(), "dd/MM/yyyy"),
    status: "noSID",
  });

  const dataNoSID = useNoSID(filter.fromTime, filter.toTime);
  const dataYesSID = useYesSID(filter.fromTime, filter.toTime);

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (filter.status === "noSID") {
      setDataTable(dataNoSID);
    } else if (filter.status === "yesSID") {
      setDataTable(dataYesSID);
    }

    handleClickView(select?.data?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, dataNoSID, dataYesSID]);

  const [select, setSelect] = useState(null);

  const handleClickView = (id) => {
    if (filter.status === "noSID") {
      const rs = dataNoSID.find((item) => item.id === id);
      if (rs) {
        setSelect({
          type: "noSID",
          data: rs,
        });
      }
    } else if (filter.status === "yesSID") {
      const rs = dataYesSID.find((item) => item.id === id);
      if (rs) {
        setSelect({
          type: "yesSID",
          data: rs,
        });
      }
    }

    detailRef.current &&
      window.scrollTo({
        top: detailRef.current.offsetTop - 60,
        behavior: "smooth",
      });
  };

  return (
    <MainLayout title="Xét nghiệm">
      <Container>
        <Row>
          <Col>
            <Filter setFilter={setFilter} setSelect={setSelect} />
          </Col>
        </Row>
        <Row>
          <Table data={dataTable} handleClickView={handleClickView} />
        </Row>
      </Container>

      {select && (
        <div ref={detailRef}>
          <Detail select={select} setSelect={setSelect} />
        </div>
      )}

      {select && (
        <Container>
          <Row>
            <Col lg={8} md={12} className="mx-auto">
              <Footer />
            </Col>
          </Row>
        </Container>
      )}

      <GoToTop />
    </MainLayout>
  );
}

export default Laboratory;
