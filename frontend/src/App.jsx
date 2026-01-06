import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import HeroSection from './components/hero/HeroSection';
import ReportsSection from './components/reports/ReportsSection';
import CampaignFilter from './components/campaigns/CampaignFilter';
import CampaignList from './components/campaigns/CampaignList';
import CreateCampaignModal from './components/campaigns/CreateCampaignModal';
import CampaignDetailsModal from './components/campaigns/CampaignDetailsModal';
import { useCampaigns } from './context/CampaignContext';
import { Container } from 'react-bootstrap';
import ScrollBackground from './components/common/ScrollBackground';

function App() {
  const { campaigns, deleteCampaign } = useCampaigns();
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignToEdit, setCampaignToEdit] = useState(null);

  // Filter Logic
  const filteredCampaigns = filter === 'all'
    ? campaigns
    : campaigns.filter(c => c.category === filter);

  // Handlers
  const handleCreateOpen = () => {
    setCampaignToEdit(null);
    setShowCreateModal(true);
  };

  const handleEdit = (campaign) => {
    setCampaignToEdit(campaign);
    setShowCreateModal(true);
  };

  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      deleteCampaign(id);
    }
  };

  return (
    <>
      <ScrollBackground />
      <Navigation onCreateCampaign={handleCreateOpen} />

      <HeroSection />

      <section id="campaigns" className="campaigns-section">
        <Container>
          <div className="section-header">
            <h2>Active Campaigns</h2>
            <CampaignFilter currentFilter={filter} onFilterChange={setFilter} />
          </div>

          <CampaignList
            campaigns={filteredCampaigns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Container>
      </section>

      <ReportsSection />

      <Footer onCreateCampaign={handleCreateOpen} />

      {/* Modals */}
      <CreateCampaignModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        campaignToEdit={campaignToEdit}
      />

      <CampaignDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        campaign={selectedCampaign}
      />
    </>
  );
}

export default App;
