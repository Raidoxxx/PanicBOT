const { PlayerManager } = require('../managers/PlayerManager.js');

class Database {
    constructor() {
        this.connection = null;
    }
  
    connect() {
        if (this.connection) return;
        const pg = require('pg');

        this.connection = new pg.Client({
            connectionString: process.env.DATABASE_URL,
        });

        this.connection.connect((err) => {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
    
            console.log('connected to postgres');
        });
    }

    async query(query, params) {
        if (!this.connection) return;
        return await this.connection.query(query, params);
    }

    async init() {
        if (!this.connection) return;
        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS cw_players (
                id VARCHAR(20) NOT NULL,
                username VARCHAR(255) NOT NULL,
                kills INT NOT NULL DEFAULT 0,
                deaths INT NOT NULL DEFAULT 0,
                wins INT NOT NULL DEFAULT 0,
                losses INT NOT NULL DEFAULT 0,
                PRIMARY KEY (id)
            );
        `).then(() => {
            console.log('Table cw_players created successfully');
        }).catch((err) => {
            console.log(err);
        });

        new PlayerManager(this);
    }

    registerPlayer(id, username) {
        if (!this.connection) return;
        return this.connection.query(`
            INSERT INTO cw_players (id, username)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING;
        `, [id, username]).catch((err) => {
            console.log(err);
        });
    }
  }

module.exports = { Database };