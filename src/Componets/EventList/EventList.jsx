import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const EventList = () => {
  const { logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        setEvents(await response.json());
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Error fetching events: ' + error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete event');
        
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
        alert('Event deleted successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event: ' + error.message);
      }
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
    return (
      <>
       <Navbar expand="md" bg="light" variant="light" className="shadow p-3">
      <Container fluid>
        <h3 className="fw-bold ms-2 me-5"> 𝙳𝚎𝚝𝚊𝚒𝚕 𝚕𝚒𝚜𝚝</h3>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-5 ">
            <Nav.Link href="/" className="ms-md-3 me-4 fw-bold">Home</Nav.Link>
            <Nav.Link href="/event" className="ms-md-3 me-4 fw-bold">Event</Nav.Link>
            <Nav.Link href="/list" className="ms-md-3 me-4 fw-bold">Details</Nav.Link>
            <Nav.Link href="/contact" className="ms-md-3 me-4 fw-bold">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
  <Row className="w-100">
    {/* First Row of Three Boxes */}
    {events.slice(0, 3).map(({ id, title, description, date, location, maxAttendees }) => (
      <Col xs={12} md={4} className="mb-3" key={id}>
        <Card className="shadow-lg p-4">
          <Card.Body>
            <Card.Title className="fw-bold">{title}</Card.Title>
            <hr />
            <p>{description}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Max Attendees:</strong> {maxAttendees}</p>
            <Button variant="warning" onClick={() => handleEdit(id)} className="me-2">
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  <Row className="w-100 mt-4">
    {events.slice(3, 6).map(({ id, title, description, date, location, maxAttendees }) => (
      <Col xs={12} md={4} className="mb-3" key={id}>
        <Card className="shadow-lg p-4">
          <Card.Body>
            <Card.Title className="fw-bold">{title}</Card.Title>
            <hr />
            <p>{description}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Max Attendees:</strong> {maxAttendees}</p>
            <Button variant="warning" onClick={() => handleEdit(id)} className="me-2">
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      </>
    );
  };
export default EventList;
