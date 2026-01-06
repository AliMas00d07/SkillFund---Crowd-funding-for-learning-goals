import { Campaign } from '../models/Campaign';

const API_URL = 'http://localhost:5000/api/campaigns';

class StorageManager {
    static async getCampaigns() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch campaigns');
            const data = await res.json();
            return data.map(c => Campaign.fromJSON(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static async getCampaignById(id) {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) return null;
        const data = await res.json();
        return Campaign.fromJSON(data);
    }

    static async addCampaign(campaign) {
        const payload = {
            title: campaign.title,
            description: campaign.description,
            goal: campaign.goal,
            category: campaign.category,
            deadline: campaign.deadline
        };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Failed to create campaign');
        }
        return await res.json();
    }

    static async updateCampaign(campaign) {
        const payload = {
            title: campaign.title,
            description: campaign.description,
            goal: campaign.goal,
            category: campaign.category,
            deadline: campaign.deadline
        };

        const res = await fetch(`${API_URL}/${campaign.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to update campaign');
        return await res.json();
    }

    static async deleteCampaign(id) {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete campaign');
        return true;
    }

    // Special methods for sub-resources if we want to use specific endpoints
    // The Campaign model in frontend calls addDonation/addComment on the instance.
    // But those modify the instance locally. We need to persist it.
    // The Context calls updateCampaign usually. 
    // BUT, backend has specific endpoints for concurrent safety?
    // Let's use the specific endpoints for donations/comments if possible, 
    // OR we can just use updateCampaign if the backend supports full update.
    // My backend updateCampaign updates fields, but doesn't handle nested inclusions creation easily unless configured.
    // Better to use specific endpoints for addDonation/addComment.

    static async addDonation(campaignId, donorName, amount) {
        const res = await fetch(`${API_URL}/${campaignId}/donations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ donorName, amount })
        });
        if (!res.ok) throw new Error('Donation failed');
        const data = await res.json();
        return Campaign.fromJSON(data);
    }

    static async addComment(campaignId, author, text) {
        const res = await fetch(`${API_URL}/${campaignId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, text })
        });
        if (!res.ok) throw new Error('Comment failed');
        const data = await res.json();
        return Campaign.fromJSON(data);
    }
}

export default StorageManager;
