import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Container, Row, Col, Button, Form, Nav , Navbar } from 'react-bootstrap';

const CreateEvent = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    image: null,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setEventData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
      existingEvents.push(eventData);
      localStorage.setItem('events', JSON.stringify(existingEvents));
      navigate('/list');

      setEventData({
        title: '',
        description: '',
        date: '',
        location: '',
        maxAttendees: '',
        image: null,
      });
      setError('');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
   <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="creat-box col-12 shadow-lg p-5">
      <Navbar expand="md" bg="light" variant="light" className="shadow p-3 mb-5">
      <Container fluid>
        <h3 className="fw-bold ms-2 me-5"> 𝚌𝚛𝚎𝚊𝚝𝚎 𝚎𝚟𝚎𝚗𝚝</h3>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-5 ">
            <Nav.Link href="/" className="ms-md-3 me-4 fw-bold">Home</Nav.Link>
            <Nav.Link href="/event" className="ms-md-3 me-4 fw-bold">Event</Nav.Link>
            <Nav.Link href="/list" className="ms-md-3 me-4 fw-bold">Details</Nav.Link>
            <Nav.Link href="/contact" className="ms-md-3 me-4 fw-bold">Contact</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center ">
            <Button variant="secondary" onClick={handleLogout} className='logout'>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter event title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter event description"
              value={eventData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLocation" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMaxAttendees" className="mt-3">
            <Form.Label>Max Attendees</Form.Label>
            <Form.Control
              type="number"
              name="maxAttendees"
              placeholder="Max attendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImageUpload" className="mt-3">
            <Form.Label>Event Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleImageUpload} />
          </Form.Group>
        </Col>

        <Col xs={12} className="d-flex flex-column justify-content-center align-items-center mt-4">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button type="submit" onClick={handleSubmit} className="mb-3 fw-bold fs-6 mt-5" id='btn'>
            Create Event
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default CreateEvent;

