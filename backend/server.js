const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const campaignRoutes = require('./routes/campaignRoutes');
require('./models'); // Ensure models are loaded

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('SkillFund API is running...');
});

// Sync Database and Start Server
sequelize.sync({ alter: true }) // alter: true updates schema if changed
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync db: ' + err.message);
    });
