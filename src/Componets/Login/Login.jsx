import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/event');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
     
     <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="login-box col-12 shadow-lg">
        <Col xs={12} md={6}className="d-flex justify-content-center align-items-center p-0">
          <div className="login-image">
          </div>
        </Col>

        <Col xs={12} md={6} className="d-flex flex-column justify-content-center p-5">
          <h4 className="text-center mb-4 fw-bold">Member Login</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className="p-2"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="p-2"
              />
            </Form.Group>

            {error && <p className="text-danger mt-3">{error}</p>}

            <Button variant="success" type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
          
    </>
);
};

export default Login;
