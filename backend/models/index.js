const Campaign = require('./Campaign');
const Donation = require('./Donation');
const Comment = require('./Comment');

// Relationships
Campaign.hasMany(Donation, { foreignKey: 'campaignId', as: 'donors', onDelete: 'CASCADE' });
Donation.belongsTo(Campaign, { foreignKey: 'campaignId' });

Campaign.hasMany(Comment, { foreignKey: 'campaignId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Campaign, { foreignKey: 'campaignId' });

module.exports = { Campaign, Donation, Comment };
