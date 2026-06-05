import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ChatWidgetDashboard.css';
import ChatWindow from './ChatWindow';
// Import the centralized axios instance
import api from '../api';

function ChatWidgetDashboard({ user, onBackToHome }) {
  const displayName = user?.name || "Guest User";
  const displayRole = "Admin Account";

  const profileImageUrl = user?.profileImage
    ? `${process.env.REACT_APP_API_BASE_URL}/${user.profileImage.replace(/\\/g, '/')}`
    : null;

  const getUserInitial = (name) => {
    if (!name) return 'U';
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    return nameParts[0][0].toUpperCase();
  };

  const [activeTab, setActiveTab] = useState('chats');
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [botSettings, setBotSettings] = useState({
    name: 'ChatBot',
    description: 'Welcome to live support!',
    avatar: null,
    language: 'English'
  });
  const [isChatActive, setIsChatActive] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      if (user?.id) {
        try {
          const settingsRes = await api.get(`/api/bot-settings/${user.id}`);
          setBotSettings(settingsRes.data);
          fetchRecentChats();
        } catch (err) {
          console.error("Error loading dashboard data", err);
        }
      }
    };
    loadInitialData();
  }, [user?.id]);

  const fetchRecentChats = async () => {
    if (user?.id) {
      try {
        const response = await api.get(`/api/recent-chats/${user.id}`);
        setRecentChats(response.data);
      } catch (err) {
        console.error("Error fetching chats", err);
      }
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await api.post('/api/chats', { userId: user.id });
      setActiveChatId(response.data._id);
      setIsChatActive(true);
      fetchRecentChats();
    } catch (err) {
      console.error("Error starting new chat", err);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await api.put('/api/bot-settings', { ...botSettings, userId: user.id });

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        formData.append('userId', user.id);
        const res = await api.post('/api/bot-settings/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setBotSettings(prev => ({ ...prev, avatar: res.data.avatarPath }));
      }
      setActiveTab('chats');
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const updateBotSettings = (field, value) => setBotSettings({ ...botSettings, [field]: value });
  const handleAvatarChange = (e) => e.target.files && setAvatarFile(e.target.files[0]);
  const handleLogout = () => onBackToHome();

  return (
    <div className="dashboard-bg py-4 min-vh-100">
      <Container fluid className="px-md-5">
        <div className="dashboard-header d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm border position-relative">
          <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={onBackToHome}>← Back to Home</Button>
          <h5 className="fw-bold mb-0 position-absolute start-50 translate-middle-x">Jarvis Dashboard Workspace</h5>
          <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
        </div>

        <div className="dashboard-card bg-white rounded-4 shadow-sm overflow-hidden border">
          <Row className="g-0">
            <Col lg={4} className="border-end p-4 bg-light-subtle d-flex flex-column justify-content-between">
              <div>
                <h6 className="fw-bold text-muted mb-3 text-uppercase tracking-wider small">Jarvis</h6>
                <ul className="nav flex-column dashboard-nav gap-2">
                  <li className={`nav-item p-2 rounded ${activeTab === 'chats' ? 'bg-white shadow-sm' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab('chats')}>💬 Recent Chats</li>
                  <li className={`nav-item p-2 rounded ${activeTab === 'bot-settings' ? 'bg-white shadow-sm' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab('bot-settings')}>⚙️ Bot Settings</li>
                </ul>

                <div className="mt-4 pt-3 border-top">
                  {activeTab === 'chats' && (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">Recent Chats ({recentChats.length})</h6>
                      </div>
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {recentChats.map(chat => (
                          <div
                            key={chat._id}
                            className="chat-item p-2 mb-2 rounded border shadow-sm"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setActiveChatId(chat._id);
                              setIsChatActive(true);
                            }}
                          >
                            <div className="d-flex justify-content-between small fw-bold">Chat<span>{new Date(chat.updatedAt).toLocaleTimeString()}</span></div>
                            <p className="text-muted mb-0 small text-truncate">{chat.snippet}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {activeTab === 'bot-settings' && (
                    <Form>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">Bot Settings</h6>
                        <Button variant="primary" size="sm" onClick={handleSaveSettings}>Save</Button>
                      </div>
                      <Form.Group className="mb-2"><Form.Label className="small">Bot Avatar</Form.Label><Form.Control type="file" size="sm" onChange={handleAvatarChange} /></Form.Group>
                      <Form.Group className="mb-2"><Form.Label className="small">Bot Name</Form.Label><Form.Control size="sm" value={botSettings.name} onChange={(e) => updateBotSettings('name', e.target.value)} /></Form.Group>
                      <Form.Group className="mb-2"><Form.Label className="small">Description</Form.Label><Form.Control size="sm" as="textarea" rows={2} value={botSettings.description} onChange={(e) => updateBotSettings('description', e.target.value)} /></Form.Group>
                    </Form>
                  )}
                </div>
              </div>

              <div className="user-profile-box p-3 bg-white border rounded-3 mt-4 d-flex align-items-center gap-3 shadow-sm">
                {profileImageUrl ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${user.profileImage}`}
                    alt="Profile"
                    className="profile-img"
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                ) : (
                  <div className="profile-avatar text-white d-flex align-items-center justify-content-center fw-bold rounded-circle" style={{ width: '40px', height: '40px', backgroundColor: '#6c757d' }}>{getUserInitial(displayName)}</div>
                )}
                <div className="overflow-hidden">
                  <h6 className="fw-bold mb-0 text-dark text-truncate">{displayName}</h6>
                  <small className="text-muted extra-small d-block">{displayRole}</small>
                </div>
              </div>
            </Col>

            <Col lg={8} className="p-4 d-flex align-items-start justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="mobile-phone-frame shadow border rounded-4 overflow-hidden bg-white" style={{ width: '100%', maxWidth: '600px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                {!isChatActive ? (
                  <>
                    <div className="p-4 text-white border-bottom" style={{ backgroundColor: '#0d6efd' }}>
                      <h4 className="fw-bold">Hello, nice to see you here 👋</h4>
                    </div>
                    <div className="p-4 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                      <img src={botSettings.avatar ? `${process.env.REACT_APP_API_BASE_URL}${botSettings.avatar}` : 'https://via.placeholder.com/100'} alt="Bot Avatar" className="rounded-circle" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                      <div className="p-4 text-center w-100 border rounded-4 shadow-sm">
                        <div className="mb-3 fw-bold fs-3">{botSettings.name}</div>
                        <p className="text-muted mb-4">{botSettings.description}</p>
                        <Button className="w-100 rounded-3 py-3 fw-bold" style={{ backgroundColor: '#0d6efd', border: 'none' }} onClick={handleNewChat}>Chat with us</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <ChatWindow
                    botName={botSettings.name}
                    selectedLanguage={botSettings.language}
                    chatId={activeChatId}
                    onCloseChat={() => setIsChatActive(false)}
                    botAvatar={botSettings.avatar}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ChatWidgetDashboard;