import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCampaigns } from '../../context/CampaignContext';

const HeroSection = () => {
    const { campaigns } = useCampaigns();

    const totalCampaigns = campaigns.length;
    const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
    const totalDonors = campaigns.reduce((sum, c) => sum + (c.donors ? c.donors.length : 0), 0);

    return (
        <section className="hero">
            <Container>
                <Row className="align-items-center">
                    <Col lg={8} className="mx-auto text-center">
                        <h1 className="hero-title">Fund Your Learning Dreams</h1>
                        <p className="hero-subtitle">Connect learners with supporters. Create campaigns for courses, certifications, bootcamps, and educational goals.</p>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-value">{totalCampaigns}</div>
                                <div className="stat-label">Active Campaigns</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">${totalRaised.toLocaleString()}</div>
                                <div className="stat-label">Total Raised</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{totalDonors}</div>
                                <div className="stat-label">Supporters</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
