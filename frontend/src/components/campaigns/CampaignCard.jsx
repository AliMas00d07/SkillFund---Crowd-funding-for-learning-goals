import React from 'react';

const CampaignCard = ({ campaign, onView, onEdit, onDelete }) => {
    // Re-instantiate to ensure methods exist if props pass plain object, 
    // though Context ensures they are instances. 
    // But safe to access properties directly.

    // We can't rely on campaign.getProgress() if we didn't rehydrate perfectly in every path,
    // but our StorageManager does handle it.
    // However, for safety in render, let's calculcate here or trust the model methods.

    const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
    const progressClass = progress >= 75 ? 'high' : progress >= 40 ? 'medium' : 'low';
    const isCompleted = campaign.raised >= campaign.goal;
    const status = isCompleted ? 'completed' : 'active';
    const statusText = isCompleted ? 'Completed' : 'Active';

    const deadlineDate = new Date(campaign.deadline);
    const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
    const deadlineText = daysLeft > 0 ? `${daysLeft} days left` : 'Expired';

    return (
        <div className="campaign-card" onClick={() => onView(campaign)}>
            <div className="campaign-header">
                <span className="campaign-category">{campaign.category}</span>
                <div className="campaign-actions">
                    <button
                        className="action-btn"
                        title="Edit"
                        onClick={(e) => { e.stopPropagation(); onEdit(campaign); }}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="action-btn delete"
                        title="Delete"
                        onClick={(e) => { e.stopPropagation(); onDelete(campaign.id); }}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            <h3 className="campaign-title">{campaign.title}</h3>
            <p className="campaign-description">{campaign.description}</p>

            <div className="campaign-progress">
                <div className="progress-info">
                    <span className="progress-amount">${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
                    <span className="progress-percentage">{progress.toFixed(0)}%</span>
                </div>
                <div className="progress-bar-container">
                    <div
                        className={`progress-bar-fill ${progressClass}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="campaign-meta">
                <div className="campaign-deadline">
                    <i className="bi bi-calendar-event"></i>
                    <span>{deadlineText}</span>
                </div>
                <span className={`campaign-status ${status}`}>{statusText}</span>
            </div>
        </div>
    );
};

export default CampaignCard;
