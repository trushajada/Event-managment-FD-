import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Nav , Navbar } from 'react-bootstrap';


const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        setEventData(await response.json());
      } catch (error) {
        console.error('Error fetching event:', error);
        alert('Error: ' + error.message);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to update event');

      alert('Event updated successfully');
      navigate('/list');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete event');

        alert('Event deleted successfully');
        navigate('/list');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 mt-4">
      <Row className="creat-box col-12 shadow-lg p-5">
        <Navbar expand="md" bg="light" variant="light" className="shadow p-3 mb-5">
          <Container fluid>
            <Navbar.Brand href="#" className="fw-bold ms-2">
              𝚌𝚛𝚎𝚊𝚝𝚎 𝚎𝚟𝚎𝚗𝚝
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ms-5">
                <Nav.Link href="/" className="ms-md-3 me-4 fw-bold">Home</Nav.Link>
                <Nav.Link href="/event" className="ms-md-3 me-4 fw-bold">Event</Nav.Link>
                <Nav.Link href="/list" className="ms-md-3 me-4 fw-bold">Details</Nav.Link>
                <Nav.Link href="/contact" className="ms-md-3 me-4 fw-bold">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Col xs={12} md={12} className="mb-3">
          <Form onSubmit={handleUpdate}>
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

            <Form.Group controlId="formDate" className="mt-3">
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


            <Col xs={12} className="d-flex flex-column justify-content-center align-items-center mt-4">
              <Button type="submit" className="mb-3 fw-bold fs-6 mt-5" id='btn'>
                Update Event
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                className="mb-3 fw-bold fs-6"
              >
                Delete Event
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
