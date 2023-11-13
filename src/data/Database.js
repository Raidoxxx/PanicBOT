const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = null;
    }
  
    connect() {
        if (this.connection) return;

        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database : process.env.DB_NAME,
        });

        this.connection.connect((err) => {
            if (err) throw err;
            console.log("Connected to the database!");
        });
    }

    async query(query, params) {
        if (!this.connection) return;
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    async init() {
        if (!this.connection) return;
        this.connection.query(`
            CREATE TABLE IF NOT EXISTS cw_players (
                id VARCHAR(20) NOT NULL,
                discord_id VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                kills INT NOT NULL DEFAULT 0,
                deaths INT NOT NULL DEFAULT 0,
                wins INT NOT NULL DEFAULT 0,
                losses INT NOT NULL DEFAULT 0,
                PRIMARY KEY (id)
            );
        `, (error) => {
            if (error) throw error;
            console.log('Database initialized');
        });
    }
}

module.exports = { Database };