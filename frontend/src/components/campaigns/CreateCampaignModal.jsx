import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Campaign } from '../../models/Campaign';
import { useCampaigns } from '../../context/CampaignContext';

const CreateCampaignModal = ({ show, onHide, campaignToEdit }) => {
    const { addCampaign, updateCampaign } = useCampaigns();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');

    // Load data when modal opens or campaignToEdit changes
    // We use a useEffect + specific key or just reset when 'show' changes if we were inside App, 
    // but better to sync with campaignToEdit.
    // However, basic way:
    React.useEffect(() => {
        if (campaignToEdit) {
            setTitle(campaignToEdit.title);
            setDescription(campaignToEdit.description);
            setGoal(campaignToEdit.goal.toString()); // Convert number to string for input value
            setCategory(campaignToEdit.category);
            // Format date for input
            const date = new Date(campaignToEdit.deadline);
            // Check if valid date
            if (!isNaN(date.getTime())) { // Use getTime() for robust date validation
                setDeadline(date.toISOString().split('T')[0]);
            }
        } else {
            // Reset if switching to create mode (optional, depends on usage)
            setTitle('');
            setDescription('');
            setGoal('');
            setCategory('');
            setDeadline('');
        }
    }, [campaignToEdit, show]); // depend on show to reset on open if needed

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !goal || !category || !deadline) {
            alert('Please fill in all fields');
            return;
        }

        if (campaignToEdit) {
            // Update
            const updated = new Campaign(
                campaignToEdit.id,
                title,
                description,
                parseFloat(goal),
                category,
                deadline,
                campaignToEdit.createdAt
            );
            // Preserve existing data (donors, raised, etc) which strict constructor re-init wipes?
            // Wait, Campaign constructor in simplified model wipes them if I pass new only.
            // I need to copy them over. 
            // Better to mutate the existing object or use a clone method?
            // Let's manually copy the props we want to keep.
            updated.raised = campaignToEdit.raised;
            updated.donors = campaignToEdit.donors;
            updated.comments = campaignToEdit.comments;

            updateCampaign(updated);
            alert('Campaign updated successfully!');
        } else {
            // Create
            const newCampaign = new Campaign(
                Date.now().toString(),
                title,
                description,
                parseFloat(goal),
                category,
                deadline
            );
            addCampaign(newCampaign);
            alert('Campaign created successfully!');
        }

        onHide();
    };

    const today = new Date().toISOString().split('T')[0];
    const isEdit = !!campaignToEdit;

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit Campaign' : 'Create Campaign'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="createCampaignForm">
                    <Form.Group className="mb-3">
                        <Form.Label>Campaign Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., Full Stack Web Development Bootcamp"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Describe your learning goals and why you need support..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Funding Goal ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="5000"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Design">Design</option>
                                    <option value="Language">Language</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Campaign Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            min={today}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" type="submit" form="createCampaignForm">
                    <i className="bi bi-check-circle me-1"></i>{isEdit ? 'Update Campaign' : 'Create Campaign'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCampaignModal;
