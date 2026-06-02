import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Hero.css'; 


function Hero({ onStartChat }) {
  return (
    <div className="hero-section text-white d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
          </Col>
          <Col md={6} className="text-center text-md-start">
            <h1 className="hero-title fw-bold text-uppercase tracking-wider">
              Chat Bot
            </h1>
            <p className="hero-description text-muted-white-50 my-4">
              Jarvis is an AI chatbot that writes text. You can use it to write stories, messages, or programming code.Instant Support, 24/7—Anytime, Anywhere
              Our AI-powered chatbot ensures your users never have to wait for an answer. By providing instant responses to inquiries around the clock,
              it eliminates frustration and builds trust from the very first interaction.
             
            </p>
            <Button 
              variant="light" 
              className="rounded-pill px-5 py-2.5 fw-bold start-chat-btn text-uppercase"
              onClick={onStartChat}
            >
              Start Chat
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;