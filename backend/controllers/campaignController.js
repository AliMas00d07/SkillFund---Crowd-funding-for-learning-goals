const { Campaign, Donation, Comment } = require('../models');

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll({
            include: [
                { model: Donation, as: 'donors' },
                { model: Comment, as: 'comments' }
            ]
        });

        // Calculate raised amount manually if needed, or let frontend do it.
        // But for consistency with frontend model, let's map it or send as is.
        // Frontend expects: raised (calculated), donors array, comments array.

        const campaignsData = campaigns.map(c => {
            const campaign = c.toJSON();
            // Calculate raised sum
            const raised = campaign.donors.reduce((sum, d) => sum + parseFloat(d.amount), 0);
            return { ...campaign, raised };
        });

        res.json(campaignsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id, {
            include: [
                { model: Donation, as: 'donors' },
                { model: Comment, as: 'comments' }
            ]
        });

        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        const data = campaign.toJSON();
        data.raised = data.donors.reduce((sum, d) => sum + parseFloat(d.amount), 0);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createCampaign = async (req, res) => {
    try {
        const { title, description, goal, category, deadline } = req.body;
        const newCampaign = await Campaign.create({
            title, description, goal, category, deadline
        });
        // Return structured like others
        const data = newCampaign.toJSON();
        data.raised = 0;
        data.donors = [];
        data.comments = [];
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Invalid Data' });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        await campaign.update(req.body);

        // Fetch updated with associations
        const updated = await Campaign.findByPk(req.params.id, {
            include: [
                { model: Donation, as: 'donors' },
                { model: Comment, as: 'comments' }
            ]
        });

        const data = updated.toJSON();
        data.raised = data.donors.reduce((sum, d) => sum + parseFloat(d.amount), 0);

        res.json(data);
    } catch (error) {
        res.status(400).json({ message: 'Update Failed' });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        await campaign.destroy();
        res.json({ message: 'Campaign deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete Failed' });
    }
};

exports.addDonation = async (req, res) => {
    try {
        const { donorName, amount } = req.body;
        await Donation.create({
            campaignId: req.params.id,
            donorName,
            amount,
            date: new Date()
        });

        // Return updated campaign
        const campaign = await Campaign.findByPk(req.params.id, {
            include: [
                { model: Donation, as: 'donors' },
                { model: Comment, as: 'comments' }
            ]
        });
        const data = campaign.toJSON();
        data.raised = data.donors.reduce((sum, d) => sum + parseFloat(d.amount), 0);

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Donation Failed' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { author, text } = req.body;
        await Comment.create({
            campaignId: req.params.id,
            author,
            text,
            timestamp: new Date()
        });

        // Return updated campaign
        const campaign = await Campaign.findByPk(req.params.id, {
            include: [
                { model: Donation, as: 'donors' },
                { model: Comment, as: 'comments' }
            ]
        });
        const data = campaign.toJSON();
        data.raised = data.donors.reduce((sum, d) => sum + parseFloat(d.amount), 0);

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Comment Failed' });
    }
};
