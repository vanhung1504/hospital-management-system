import { Col, Container, Row } from "react-bootstrap";
import img from "~/assets/images/Developing/developing.gif";

function Developing() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="p-3 mx-auto d-flex align-items-center justify-content-center w-50">
            <img src={img} alt={img} className="img-fluid" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-3 fw-bolder text-primary text-center">
            Đang phát triển...
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Developing;
