
const Sequelize = require('sequelize');

const sequelize = new Sequelize('skillfund_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.original ? err.original.sqlMessage : err.message);
        if (err.parent && err.parent.code === 'ER_BAD_DB_ERROR') {
            console.log("Database 'skillfund_db' does not exist.");
        }
        process.exit(1);
    });
