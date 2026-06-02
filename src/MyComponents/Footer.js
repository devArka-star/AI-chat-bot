import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-footer text-white pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          
          {/* Column 1: Brand Info */}
          <Col lg={4} md={6}>
            <h5 className="fw-bold text-white mb-3 d-flex align-items-center">
              <span className="me-2 text-primary">⚡</span> Jarvis
            </h5>
            <p className="footer-text">
              Jarvis is an AI chatbot that writes text. You can use it to write stories, messages, or programming code
            </p>
          </Col>

          {/* Column 2: Product Links */}
          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold text-secondary mb-3 tracking-wider small">
              Product
            </h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#changelog">Changelog</a></li>
            </ul>
          </Col>

          {/* Column 3: Company Links */}
          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold text-secondary mb-3 tracking-wider small">
              Company
            </h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </Col>

          {/* Column 4: Resources Links */}
          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold text-secondary mb-3 tracking-wider small">
              Resources
            </h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>

          {/* Column 5: Social / Meta */}
          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold text-secondary mb-3 tracking-wider small">
              Connect
            </h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#github">GitHub</a></li>
              <li><a href="#discord">Discord</a></li>
            </ul>
          </Col>

        </Row>

        {/* Divider Line */}
        <hr className="my-4 footer-divider" />

        {/* Bottom copyright fold */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p className="footer-bottom-text mb-0">
              &copy; {new Date().getFullYear()} Jarvis. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <span className="footer-bottom-text me-3" style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span className="footer-bottom-text" style={{ cursor: 'pointer' }}>Terms of Service</span>
          </Col>
        </Row>

      </Container>
    </footer>
  );
}

export default Footer;