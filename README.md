# SkillFund---Crowd-funding-for-learning-goals
SkillFund — Crowd-funding for Learning Goals  A web application for crowdfunding individual learning goals: users can create campaigns to fund their educational objectives, receive donations, and track progress. 
The platform simulates donation flows, tracks campaign metrics, and supports commenting and reporting.

**Features**
**Campaign Management**: Create, update, and manage fundraising campaigns for educational goals.
**Donation System**: Securely handle donations (simulated/integrated) to support campaigns.
**Progress Tracking**: Real-time visual progress bars showing funding status.
**Interactive Community**: Users can comment on campaigns and report inappropriate content.
**Responsive Design**: Optimized for both desktop and mobile devices.

🛠️ **Tech Stack**
**Frontend**
React.js (Vite) for a fast and reactive user interface.
Bootstrap 5 & React-Bootstrap for responsive styling and components.
Context API for global state management.

**Backend**
Node.js & Express for the RESTful API.
MySQL as the relational database.
Sequelize ORM for database modeling and querying.

📂 Project Structure
SkillFund/
├── backend/            # Express.js API and Database Models
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic
│   ├── models/         # Sequelize models (Campaign, Donation, Comment)
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # State management
│   │   ├── services/   # API calls
│   │   └── App.jsx     # Main component
│   └── package.json    # Frontend dependencies
└── README.md           # Project documentation

🔧 **Getting Started**
Prerequisites
Node.js (v14+)
MySQL Server
Installation
Clone the repository

git clone https://github.com/yourusername/SkillFund.git
cd SkillFund
Setup Backend

cd backend
npm install
# Create a .env file with your database config
# DB_NAME=skillfund
# DB_USER=root
# DB_PASS=yourpassword
# DB_HOST=localhost
# Initialize Database
npm run init-db
# Start Server
npm run dev
Setup Frontend

cd ../frontend
npm install
npm run dev
