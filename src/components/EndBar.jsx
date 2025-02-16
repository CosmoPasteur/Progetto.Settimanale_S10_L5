import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function EndBar() {
  return (
    <footer>
      <Container fluid className="bg-info py-1 ">
        <Row>
          <Col className="d-flex justify-content-between ">
            <p className="m-0 ">&copy; 2024 YourCompany, Inc. </p>
            <span>
              <FaFacebook size={25} className="footer-icon me-2 text-white" />
              <FaInstagram size={25} className="footer-icon me-2 text-white" />
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default EndBar;
