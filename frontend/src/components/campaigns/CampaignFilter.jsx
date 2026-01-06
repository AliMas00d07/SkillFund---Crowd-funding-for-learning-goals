import React from 'react';

const CampaignFilter = ({ currentFilter, onFilterChange }) => {
    const categories = ['all', 'Technology', 'Business', 'Design', 'Language', 'Other'];

    return (
        <div className="filter-buttons">
            {categories.map(category => (
                <button
                    key={category}
                    className={`filter-btn ${currentFilter === category ? 'active' : ''}`}
                    onClick={() => onFilterChange(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default CampaignFilter;
