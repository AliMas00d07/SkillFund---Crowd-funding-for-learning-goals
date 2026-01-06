import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Navigation = ({ onCreateCampaign }) => {
    return (
        <Navbar expand="lg" variant="dark" sticky="top" className="navbar">
            <Container>
                <Navbar.Brand href="#" id="brand">
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    <span>SkillFund</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#campaigns">Campaigns</Nav.Link>
                        <Nav.Link href="#reports">Reports</Nav.Link>
                        <Nav.Item className="ms-lg-3">
                            <Button variant="primary" onClick={onCreateCampaign}>
                                <i className="bi bi-plus-circle me-1"></i>Create Campaign
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
