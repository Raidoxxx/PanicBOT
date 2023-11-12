const { Player } = require('../data/Player.js');
const { client } = require('../index.js');

class PlayerManager {
    constructor() {
        this.players = [];
        this.connection = null;
    }

    init(){
        if (!this.connection){  
            this.connection = client.db;
        }

        this.connection.query(`SELECT * FROM cw_players;`).then((res) => {
            res.rows.forEach((row) => {
                this.addPlayer(new Player(row.id, row.username, this));
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    
    addPlayer(player) {
        this.players.push(player);
    }
    
    getPlayer(id) {
        return this.players.find((player) => player.id === id);
    }

    registerPlayer(id, username) {
        this.connection.query(`
            INSERT INTO cw_players (id, username)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING;
        `, [id, username]).catch((err) => {
            console.log(err);
        });
        this.addPlayer(new Player(id, username, this));
    }   

    removePlayer(id) {
        const player = this.getPlayer(id);
        if (!player) return;
        this.players.splice(this.players.indexOf(player), 1);
        
        this.connection.query(`
            DELETE FROM cw_players
            WHERE id = $1;
        `, [id]).catch((err) => {
            console.log(err);
        });
    }

    async savePlayer(id) {
        const player = this.getPlayer(id);
        await player.save();
    }

    async saveAll() {
        this.players.forEach(async (player) => {
            await player.save();
        });
    }
}

module.exports = { PlayerManager };