CREATE DATABASE IF NOT EXISTS skillfund_db;
USE skillfund_db;

CREATE TABLE IF NOT EXISTS Campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    goal DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    donorName VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (campaignId) REFERENCES Campaigns(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    author VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (campaignId) REFERENCES Campaigns(id) ON DELETE CASCADE
);
