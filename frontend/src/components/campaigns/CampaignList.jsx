import React from 'react';
import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, onView, onEdit, onDelete }) => {
    if (campaigns.length === 0) {
        return (
            <div className="no-campaigns">
                <i className="bi bi-inbox" style={{ color: 'white' }}></i>
                <p style={{ color: 'white' }}>No campaigns found. Create one!</p>
            </div>
        );
    }

    return (
        <div className="campaigns-grid">
            {campaigns.map(campaign => (
                <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default CampaignList;
