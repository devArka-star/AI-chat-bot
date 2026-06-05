import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css';
import robotPic from '../img/download.png';
// Import the centralized axios instance
import api from '../api'; 

export default function Login({ onBackToLanding, onCreateAccount, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Attempting to connect to backend...");

        try {
            // Using the axios instance to make the request
            const response = await api.post('/api/auth/login', {
                email: username,
                password: password
            });

            console.log("Response status:", response.status);
            // Axios automatically parses the response body, so 'data' is already available
            const data = response.data;

            if (response.status === 200) {
                alert(`Welcome back, ${data.user.name}!`);
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                if (onLoginSuccess) {
                    onLoginSuccess(data.user); 
                }
            }
        } catch (error) {
            console.error('Frontend Login Networking Error:', error);
            // Handling errors via axios
            const errorMessage = error.response?.data?.error || 'Server unreachable. Please ensure the backend is running.';
            alert(errorMessage);
        }
    };

    return (
        <div className="login-page-viewport d-flex align-items-center justify-content-center">
            <Button
                variant="link"
                className="text-white position-absolute top-0 start-0 m-4 text-decoration-none fw-bold"
                onClick={onBackToLanding}
            >
                ← Back to Home
            </Button>

            <Container className="login-glass-card p-4 p-md-5 rounded-4 shadow-lg">
                <Row className="align-items-center h-100">
                    <Col md={6} className="text-center d-none d-md-flex flex-column align-items-center justify-content-center position-relative">
                        <div className="mascot-animation-wrapper">
                            <img
                                src={robotPic}
                                alt="AI Robot Mascot"
                                className="img-fluid rounded-4 shadow-sm mascot-image"
                                style={{ maxWidth: '85%', mixBlendMode: 'screen' }}
                            />
                        </div>
                    </Col>

                    <Col xs={12} md={6} className="px-lg-4 px-md-3 text-white">
                        <div className="d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start">
                            <div className="brand-icon-bubble bg-primary rounded-circle px-2 py-1 fw-bold text-white small">🤖</div>
                            <h4 className="mb-0 fw-bold tracking-wide">Jarvis</h4>
                        </div>

                        <Form onSubmit={handleLoginSubmit} className="login-form-element">
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label className="small text-white-50 fw-semibold mb-1">Username / Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your UserName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-white text-dark rounded-3 py-2 px-3 border-0"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <Form.Label className="small text-white-50 fw-semibold mb-0">Password</Form.Label>
                                    <a href="#forgot" className="extra-small text-info text-decoration-none">Forgot Password?</a>
                                </div>
                                <Form.Control
                                    type="password"
                                    placeholder="***************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white text-dark rounded-3 py-2 px-3 border-0"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formRememberMe">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember Me"
                                    className="small text-white-50"
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary" className="w-100 py-2.5 rounded-pill fw-bold signin-btn shadow-sm mb-3">
                                Sign In
                            </Button>

                            <p className="text-center text-md-start small text-white-50 mb-2" style={{ fontSize: '0.8rem' }}>
                                New on our Platform?{' '}
                                <Button
                                    variant="link"
                                    className="text-info text-decoration-none p-0 fw-semibold align-baseline small"
                                    style={{ fontSize: '0.8rem' }}
                                    onClick={onCreateAccount}
                                >
                                    Create an Account
                                </Button>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}