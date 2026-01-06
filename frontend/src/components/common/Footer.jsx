import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCampaigns } from '../../context/CampaignContext';

const Footer = ({ onCreateCampaign }) => {
    const { campaigns } = useCampaigns();

    const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg={4} className="mb-4 mb-lg-0">
                        <h5><i className="bi bi-mortarboard-fill me-2"></i>SkillFund</h5>
                        <p className="footer-text">Empowering learners worldwide to achieve their educational goals through community support.</p>
                    </Col>
                    <Col lg={4} className="mb-4 mb-lg-0">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="#campaigns">Browse Campaigns</a></li>
                            <li><a href="#reports">View Reports</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onCreateCampaign(); }}>Start Campaign</a></li>
                        </ul>
                    </Col>
                    <Col lg={4}>
                        <h6>Platform Stats</h6>
                        <p className="footer-stat">Campaigns: <span>{campaigns.length}</span></p>
                        <p className="footer-stat">Total Raised: <span>${totalRaised.toLocaleString()}</span></p>
                    </Col>
                </Row>
                <div className="footer-bottom">
                    <p style={{ color: 'white' }}>&copy; 2025 SkillFund. Empowering Education.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
