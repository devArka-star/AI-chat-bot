import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Features() {
  return (
    <div className="bg-white text-dark py-5" style={{ minHeight: '50vh' }}>
      <Container>
        
        {/* === BRAND LOGOS SUB-SECTION === */}
        <div className="text-center mb-5">
          <p className="text-muted fw-bold text-uppercase tracking-wider small">
            15,000+ Professionals & Teams Choose Jarvis
          </p>
         {/* <Row className="justify-content-center align-items-center g-4 opacity-75 mt-2">
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">SIEMENS</Col>
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">nickelodeon</Col>
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">Ogilvy</Col>
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">❄️ snowflake</Col>
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">Forbes</Col>
            <Col xs={4} md={2} className="fw-bold fs-4 text-secondary">dyson</Col>
          </Row> */}
        </div>

        {/* <hr className="my-5 opacity-25" /> */}

        {/* === 3-COLUMN CARDS SECTION === */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Jarvis</h2>
        </div>

        <Row className="g-4">
          {/* Card 1 */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3 bg-light">
              <Card.Body>
                <div className="fs-1 mb-3 text-primary">📝</div>
                <Card.Title className="fw-bold">Fast Text Generate</Card.Title>
                <Card.Text className="text-muted">
                  Generate text responses quickly and efficiently with our optimized AI pipelines.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3 bg-light">
              <Card.Body>
                <div className="fs-1 mb-3 text-primary">🔍</div>
                <Card.Title className="fw-bold">High Quality Content</Card.Title>
                <Card.Text className="text-muted">
                  Get custom content tailored to your specific needs, delivered directly to your application context.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3 bg-light">
              <Card.Body>
                <div className="fs-1 mb-3 text-primary">🌐</div>
                <Card.Title className="fw-bold">60+ Languages</Card.Title>
                <Card.Text className="text-muted">
                  Connect with customers in over 60+ languages effortlessly with instant real-time translation support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Features;