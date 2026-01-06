import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import { useCampaigns } from '../../context/CampaignContext';

const CampaignDetailsModal = ({ campaign, show, onHide }) => {
    const { addDonation, addComment } = useCampaigns();
    const [donorName, setDonorName] = useState('');
    const [donationAmount, setDonationAmount] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentText, setCommentText] = useState('');

    if (!campaign) return null;

    const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
    const customProgressClass = progress >= 75 ? 'high' : progress >= 40 ? 'medium' : 'low';

    const isCompleted = campaign.raised >= campaign.goal;

    const handleDonation = (e) => {
        e.preventDefault();
        if (!donorName || !donationAmount || parseFloat(donationAmount) <= 0) return;

        addDonation(campaign.id, donorName, donationAmount);

        setDonorName('');
        setDonationAmount('');
        alert(`Thank you ${donorName} for donating $${donationAmount}!`);
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (!commentAuthor || !commentText) return;

        addComment(campaign.id, commentAuthor, commentText);

        setCommentAuthor('');
        setCommentText('');
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="xl" contentClassName="modal-content">
            <Modal.Header closeButton>
                <Modal.Title>{campaign.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="details-header">
                    <h3 className="details-title">{campaign.title}</h3>
                    <span className="campaign-category">{campaign.category}</span>
                </div>

                <div className="details-section">
                    <h6><i className="bi bi-info-circle me-2"></i>Description</h6>
                    <p className="campaign-description" style={{ WebkitLineClamp: 'unset' }}>{campaign.description}</p>
                </div>

                <div className="details-section">
                    <h6><i className="bi bi-bullseye me-2"></i>Funding Progress</h6>
                    <div className="campaign-progress">
                        <div className="progress-info">
                            <span className="progress-amount">${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal</span>
                            <span className="progress-percentage">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar-container" style={{ height: '12px' }}>
                            <div className={`progress-bar-fill ${customProgressClass}`} style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    {campaign.donors && campaign.donors.length > 0 ? (
                        <div className="donor-list">
                            {campaign.donors.map((d, index) => (
                                <span className="donor-badge" key={index}>
                                    <i className="bi bi-heart-fill me-1"></i>{d.name} - ${d.amount}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted mt-2">No donations yet. Be the first supporter!</p>
                    )}
                </div>

                {!isCompleted ? (
                    <div className="details-section">
                        <h6><i className="bi bi-cash-coin me-2"></i>Make a Donation</h6>
                        <Form onSubmit={handleDonation}>
                            <Form.Group className="mb-3">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={donorName}
                                    onChange={(e) => setDonorName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Donation Amount ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Enter amount"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                <i className="bi bi-heart-fill me-2"></i>Donate Now
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <Alert variant="success">
                        <i className="bi bi-check-circle-fill me-2"></i>This campaign has reached its goal! 🎉
                    </Alert>
                )}

                <div className="details-section">
                    <h6><i className="bi bi-chat-dots me-2"></i>Comments ({campaign.comments ? campaign.comments.length : 0})</h6>
                    <Form onSubmit={handleComment} className="comment-form">
                        <Form.Control
                            type="text"
                            className="mb-2"
                            placeholder="Your name"
                            value={commentAuthor}
                            onChange={(e) => setCommentAuthor(e.target.value)}
                            required
                        />
                        <Form.Control
                            as="textarea"
                            rows={2}
                            className="mb-2"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                        <Button variant="primary" size="sm" type="submit">
                            <i className="bi bi-send me-1"></i>Post Comment
                        </Button>
                    </Form>
                    <div className="comments-list">
                        {campaign.comments && campaign.comments.length > 0 ? (
                            [...campaign.comments].reverse().map((c, index) => (
                                <div className="comment-item" key={index}>
                                    <div>
                                        <span className="comment-author">{c.author}</span>
                                        <span className="comment-time">{formatDate(c.timestamp)}</span>
                                    </div>
                                    <p className="comment-text">{c.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CampaignDetailsModal;
