const { Player } = require('../data/Player.js');
const { client } = require('../index.js');

class PlayerManager {
    constructor(database) {
        this.players = [];
        this.connection = database;
    }

    init(){
        console.log('Initializing player data...');
        this.connection.query(`
            SELECT * 
            FROM cw_players;
        `, (error, results) => {
            if (error) throw error;

            results.forEach((result) => {
                const player = new Player(result.id, result.discord_id, result.username, this.connection);
                this.players.push(player);
            });
        });
    }

    async existPlayer(id) {
        const query = `
        SELECT * 
        FROM cw_players 
        WHERE discord_id = ?;
        `;
        const params = [id];

        const res = await this.connection.query(query, params);

        if (res.length === 0) {
            return false;
        }

        return true;
    }
    
    addPlayer(player) {
        this.players.push(player);
    }
    
    async registerPlayer(id, dc_id, username) {

        const query = `
        INSERT INTO cw_players (id, discord_id, username, kills, deaths, wins, losses) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const params = [id, dc_id, username, 0, 0, 0, 0];

        await this.connection.query(query, params);

        this.addPlayer(new Player(id, dc_id, username, this.connection));
    }   
   
    async getPlayer(dc_id) {
        // search for player in cache
       // console.log('Searching for player in cache...');
        //console.log(this.players.find((player) => player.dc_id === dc_id))
        const player = this.players.find((player) => player.dc_id === dc_id);

        if (player) return player;
    }

    async getPlayers() {
        return this.players;
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