import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button, Card, ListGroup, Carousel, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local storage helper functions
const saveDonors = (donors) => localStorage.setItem('donors', JSON.stringify(donors));
const getDonors = () => JSON.parse(localStorage.getItem('donors')) || [];

// Home Page Component
const HomePage = () => (
  <Container className="mt-4">
    {/* Hero Section */}
    <div className="hero-section text-center p-5 bg-light rounded-3 mb-5">
      <h1 className="display-4">Save Lives, Donate Blood</h1>
      <p className="lead">Join our noble initiative organized by College NSS Unit</p>
      <Link to="/register" className="btn btn-danger btn-lg">Register as Donor</Link>
    </div>

    {/* College Information Section */}
    <section className="college-info mb-5">
      <h2 className="text-center mb-4">About Our College</h2>
      <Row>
        <Col md={6}>
          <Carousel>
          <Carousel.Item>
  <img
    className="d-block w-100"
    src="/images/topview.jpg"  // Corrected path
    alt="College Campus"
  />
</Carousel.Item>
<Carousel.Item>
<img
                className="d-block w-100"
                src="/images/front new.jpg"  // Updated path
                alt="College Campus"
              />
</Carousel.Item>


          </Carousel>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h3>Welcome to Our Prestigious Institution</h3>
            <p>
              Established in 1990, our college has been a pioneer in quality education and 
              social initiatives. Our campus spans 50 acres with state-of-the-art facilities 
              and a strong emphasis on community service.
            </p>
          </div>
        </Col>
      </Row>
    </section>

    {/* NSS Section */}
    <section className="nss-info bg-danger text-white p-5 rounded-3 mb-5">
      <h2 className="text-center mb-4">About NSS</h2>
      <Row>
        <Col md={4}>
          <img 
            src="/images/nss.png"
            alt="NSS Logo "
            className="img-fluid rounded-circle"
          />
        </Col>
        <Col md={8} className="d-flex align-items-center">
          <div>
            <h3>National Service Scheme</h3>
            <p>
              Our NSS unit has been actively involved in community service for over two decades. 
              We organize regular blood donation camps, health awareness programs, and 
              environmental initiatives. With the motto "Not Me But You", we strive to create 
              social awareness and develop responsible citizens.
            </p>
            <h5>Blood Donation Achievements:</h5>
            <ul>
              <li>5000+ units collected since 2010</li>
              <li>100+ blood donation camps organized</li>
              <li>Recognized as Best NSS Unit at State Level</li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  </Container>
);

// Donor Registration Component
const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'A+',
    address: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const donors = getDonors();
    donors.push(formData);
    saveDonors(donors);
    alert('Registration Successful!');
    setFormData({ name: '', bloodGroup: 'A+', address: '', phone: '' });
  };

  return (
    <Container className="mt-5">
      <h2>Donor Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Blood Group</Form.Label>
          <Form.Select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            required
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </Form.Group>

        <Button variant="danger" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

// Blood Search Component
const BloodSearch = () => {
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    setDonors(getDonors());
  }, []);

  const filteredDonors = donors.filter(donor => donor.bloodGroup === bloodGroup);

  return (
    <Container className="mt-5">
      <h2>Search Blood Donors</h2>
      <Form.Group className="mb-3">
        <Form.Label>Select Blood Group</Form.Label>
        <Form.Select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </Form.Select>
      </Form.Group>

      <h4 className="mt-4">Available Donors for {bloodGroup}</h4>
      {filteredDonors.length === 0 ? (
        <p>No donors found for this blood group</p>
      ) : (
        <div className="row">
          {filteredDonors.map((donor, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{donor.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Blood Group: {donor.bloodGroup}</ListGroup.Item>
                    <ListGroup.Item>Address: {donor.address}</ListGroup.Item>
                    <ListGroup.Item>
                      Phone: <a href={`tel:${donor.phone}`}>{donor.phone}</a>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Blood Donation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/search">Search Donors</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<DonorRegistration />} />
        <Route path="/search" element={<BloodSearch />} />
      </Routes>
    </Router>
  );
};

export default App;