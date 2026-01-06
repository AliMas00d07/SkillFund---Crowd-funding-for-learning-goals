import React from 'react';
import { Container } from 'react-bootstrap';
import { useCampaigns } from '../../context/CampaignContext';

const ReportsSection = () => {
    const { campaigns } = useCampaigns();

    const totalCampaigns = campaigns.length;
    const totalDonations = campaigns.reduce((sum, c) => sum + c.raised, 0);
    const averageDonation = totalCampaigns > 0 ? totalDonations / totalCampaigns : 0;
    const completedCampaigns = campaigns.filter(c => c.raised >= c.goal).length;

    const topCampaigns = [...campaigns]
        .sort((a, b) => b.raised - a.raised)
        .slice(0, 3);

    return (
        <section id="reports" className="reports-section">
            <Container>
                <h2 className="section-title">Platform Reports</h2>
                <div className="reports-grid">
                    <div className="report-card">
                        <div className="report-icon">
                            <i className="bi bi-clipboard-data"></i>
                        </div>
                        <div className="report-content">
                            <div className="report-value">{totalCampaigns}</div>
                            <div className="report-label">Total Campaigns</div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-icon">
                            <i className="bi bi-cash-stack"></i>
                        </div>
                        <div className="report-content">
                            <div className="report-value">${totalDonations.toLocaleString()}</div>
                            <div className="report-label">Total Donations</div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-icon">
                            <i className="bi bi-graph-up"></i>
                        </div>
                        <div className="report-content">
                            <div className="report-value">${averageDonation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <div className="report-label">Average per Campaign</div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-icon">
                            <i className="bi bi-trophy"></i>
                        </div>
                        <div className="report-content">
                            <div className="report-value">{completedCampaigns}</div>
                            <div className="report-label">Completed Campaigns</div>
                        </div>
                    </div>
                </div>

                {/* Top Campaigns */}
                <div className="top-campaigns-section">
                    <h3 className="subsection-title">Top Funded Campaigns</h3>
                    <div className="top-campaigns-list">
                        {topCampaigns.length > 0 ? (
                            topCampaigns.map((campaign, index) => (
                                <div className="top-campaign-item" key={campaign.id}>
                                    <div className="top-campaign-rank">{index + 1}</div>
                                    <div className="top-campaign-info">
                                        <div className="top-campaign-title">{campaign.title}</div>
                                        <div className="top-campaign-category">{campaign.category}</div>
                                    </div>
                                    <div className="top-campaign-amount">${campaign.raised.toLocaleString()}</div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'white' }} className="text-center py-3">No campaigns available yet.</p>
                        )}
                    </div>
                </div>
            </Container>
        </section >
    );
};

export default ReportsSection;
