
export class Campaign {
    constructor(id, title, description, goal, category, deadline, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.goal = Number(goal);
        this.category = category;
        this.deadline = deadline;
        this.createdAt = new Date(createdAt);
        this.raised = 0;
        this.donors = [];
        this.comments = [];
    }

    addDonation(donorName, amount) {
        this.raised += parseFloat(amount);
        this.donors.push({ name: donorName, amount: parseFloat(amount), date: new Date() });
    }

    addComment(author, text) {
        this.comments.push({ author, text, timestamp: new Date() });
    }

    getProgress() {
        if (this.goal <= 0) return 0;
        return Math.min((this.raised / this.goal) * 100, 100);
    }

    isCompleted() {
        return this.raised >= this.goal;
    }

    isExpired() {
        return new Date() > new Date(this.deadline);
    }

    // Helper to re-hydrate from JSON
    static fromJSON(json) {
        const campaign = new Campaign(
            json.id,
            json.title,
            json.description,
            json.goal,
            json.category,
            json.deadline,
            json.createdAt
        );
        campaign.raised = json.raised || 0;
        campaign.donors = json.donors || [];
        campaign.comments = json.comments || [];
        return campaign;
    }
}
