import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageManager from '../services/StorageManager';

const CampaignContext = createContext();

export const useCampaigns = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshCampaigns = async () => {
        setLoading(true);
        try {
            const data = await StorageManager.getCampaigns();
            setCampaigns(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load campaigns.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshCampaigns();
    }, []);

    const addCampaign = async (campaign) => {
        try {
            await StorageManager.addCampaign(campaign);
            await refreshCampaigns();
        } catch (err) {
            console.error(err);
            alert("Failed to create campaign");
        }
    };

    const updateCampaign = async (campaign) => {
        try {
            // Check if it's a donation or comment or general update?
            // The Campaign model methods (addDonation) modify the object locally.
            // But we need to persist. 
            // If the campaign object passed here has new donations/comments that are NOT yet persisted,
            // we have a problem because our StorageManager.updateCampaign only updates fields.
            // AND we implemented addDonation/addComment in StorageManager separately.

            // We should ideally change how compoonents call this.
            // BUT to minimize component refactor, we can check what changed or just try to update fields.
            // HOWEVER, for donations/comments, the components (CampaignDetailsModal) call campaign.addDonation() then updateCampaign(campaign).
            // We need to intercept that.

            // Actually, we should expose addDonation/addComment in the Context and let components call that instead of modifying local object + update.
            // But let's support general update first.
            await StorageManager.updateCampaign(campaign);
            await refreshCampaigns();
        } catch (err) {
            console.error(err);
            alert("Failed to update campaign");
        }
    };

    const deleteCampaign = async (id) => {
        try {
            await StorageManager.deleteCampaign(id);
            await refreshCampaigns();
        } catch (err) {
            console.error(err);
            alert("Failed to delete campaign");
        }
    };

    // New methods for granular updates
    const addDonation = async (id, donor, amount) => {
        try {
            await StorageManager.addDonation(id, donor, amount);
            await refreshCampaigns();
        } catch (err) { console.error(err); alert("Donation failed"); }
    };

    const addComment = async (id, author, text) => {
        try {
            await StorageManager.addComment(id, author, text);
            await refreshCampaigns();
        } catch (err) { console.error(err); alert("Comment failed"); }
    };

    return (
        <CampaignContext.Provider value={{
            campaigns,
            loading,
            error,
            addCampaign,
            updateCampaign,
            deleteCampaign,
            refreshCampaigns,
            addDonation,
            addComment
        }}>
            {children}
        </CampaignContext.Provider>
    );
};
