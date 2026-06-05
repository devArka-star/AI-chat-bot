import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css'; 
import robotPic from '../img/download.png'; 
// Import the centralized axios instance
import api from '../api'; 

export default function Register({ onBackToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);       
    const [imagePreview, setImagePreview] = useState('');         
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            alert("Please agree to the Terms of Conditions");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            // Using the axios instance to make the request
            const response = await api.post('/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert('Registration Successful! Redirecting to login...');
                if (onBackToLogin) onBackToLogin();
            }
        } catch (error) {
            console.error('Registration Error:', error);
            const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
            alert(errorMessage);
        }
    };

    return (
        <div className="login-page-viewport d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', position: 'relative' }}>
            <Button
                variant="link"
                className="text-white position-absolute top-0 start-0 m-4 text-decoration-none fw-bold"
                onClick={onBackToLogin}
                style={{ zIndex: 10 }}
            >
                ← Back to Login
            </Button>

            <h2 className="text-white fw-bold mb-4 tracking-wide text-center" style={{ fontSize: '2.4rem', fontFamily: 'sans-serif' }}>
                Register Form
            </h2>

            <Container className="register-exact-card p-4 rounded-4 shadow">
                <Row className="align-items-center h-100 g-4">
                    <Col md={5} className="text-center d-none d-md-flex align-items-center justify-content-center">
                        <img src={robotPic} alt="3D Robot Mascot" className="img-fluid mascot-fit-image" />
                    </Col>
                    <Col xs={12} md={7} className="text-white px-md-3">
                        <div className="mb-2 text-center text-md-start">
                            <h3 className="fw-bold mb-1" style={{ fontSize: '1.35rem' }}>
                                Welcome to Sign Up <span className="text-primary">Buddy!</span>
                            </h3>
                        </div>
                        <Form onSubmit={handleRegisterSubmit} className="d-flex flex-column">
                            <div className="text-center mb-2">
                                <label htmlFor="avatar-file-input" className="avatar-upload-wrapper d-block">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Avatar Preview" className="profile-preview-circle rounded-circle shadow" />
                                    ) : (
                                        <div className="profile-preview-circle rounded-circle d-flex align-items-center justify-content-center text-white shadow" style={{ fontSize: '1.8rem' }}>👤</div>
                                    )}
                                    <div className="upload-badge-icon d-flex align-items-center justify-content-center">📷</div>
                                </label>
                                <input id="avatar-file-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                <span className="text-white-50 d-block mt-1" style={{ fontSize: '0.72rem' }}>Click icon to upload photo</span>
                            </div>
                            <Form.Group className="mb-2" controlId="registerName">
                                <Form.Control type="text" placeholder="👤  Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="dark-input-field py-2 px-3 rounded-3" required />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="registerEmail">
                                <Form.Control type="email" placeholder="✉  Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="dark-input-field py-2 px-3 rounded-3" required />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="registerPassword">
                                <Form.Control type="password" placeholder="🔒  Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="dark-input-field py-2 px-3 rounded-3" required />
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex align-items-center" controlId="registerTerms">
                                <Form.Check type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} label={<span className="text-white-50" style={{ fontSize: '0.75rem', marginLeft: '4px' }}>I agree to <a href="#terms" className="text-primary text-decoration-none">Terms of Conditions</a></span>} required />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="py-2 rounded-3 fw-bold mb-2 w-100" style={{ backgroundColor: '#2563eb', border: 'none' }}>Sign Up</Button>
                            <div className="w-100 text-center text-md-start mb-2">
                                <p className="text-white-50 small mb-0" style={{ fontSize: '0.78rem' }}>
                                    Already have an account?{' '}
                                    <Button variant="link" className="text-primary text-decoration-none p-0 fw-semibold align-baseline small" onClick={onBackToLogin}>Sign In</Button>
                                </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}