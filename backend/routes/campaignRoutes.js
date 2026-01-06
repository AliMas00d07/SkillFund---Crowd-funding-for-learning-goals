const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaignController');

router.get('/', controller.getAllCampaigns);
router.post('/', controller.createCampaign);
router.get('/:id', controller.getCampaignById);
router.put('/:id', controller.updateCampaign);
router.delete('/:id', controller.deleteCampaign);

router.post('/:id/donations', controller.addDonation);
router.post('/:id/comments', controller.addComment);

module.exports = router;
