const { LeaderboardWeek } = require('./LeaderBoardWeek.js');

class Leaderboard {
    constructor(database) {
        this.connection = database;
        this.leaderboard_channel = null;
        this.leaderboard_week = new LeaderboardWeek(this);
    }

    async init() {
        console.log('Initializing leaderboard data...');
        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS leaderboards (
                channel_id VARCHAR(255),
                kills_embed_id VARCHAR(255),
                deaths_embed_id VARCHAR(255),
                wins_embed_id VARCHAR(255),
                losses_embed_id VARCHAR(255),
                kdr_embed_id VARCHAR(255)
            );
        `);

        await this.getLeaderboardChannel().then((res) => {
            if (res) {
                this.leaderboard_channel = res.channel_id;
            }
        });

        console.log('Leaderboard initialized');
    }

    async addLeaderboardChannel(channel_id) {
        const query = `
            INSERT INTO leaderboards (channel_id) 
            VALUES (?);
        `;
        const params = [channel_id];

        await this.connection.query(query, params);
    }

    async removeLeaderboardChannel(channel_id) {
        const query = `
            DELETE FROM leaderboards
            WHERE channel_id = ?;
        `;
        const params = [channel_id];

        await this.connection.query(query, params);
    }

    async getLeaderboardChannel() {
        const query = `
            SELECT channel_id
            FROM leaderboards;
        `;

        const params = [];

        const res = await this.connection.query(query, params);

        if (res.length === 0) {
            return false;
        }

        return res[0];
    }

    async addLeaderboardEmbed(channel_id, embed_id, type) {
        if (!['kills', 'deaths', 'wins', 'losses', 'kdr'].includes(type)) {
            return false;
        }

        const query = `
            UPDATE leaderboards
            SET ${type}_embed_id = ?
            WHERE channel_id = ?;
        `;
        const params = [embed_id, channel_id];

        await this.connection.query(query, params);
    }

    async removeLeaderboardEmbed(channel_id, type) {
        if (!['kills', 'deaths', 'wins', 'losses', 'kdr'].includes(type)) {
            return false;
        }

        const query = `
            UPDATE leaderboards
            SET ${type}_embed_id = NULL
            WHERE channel_id = ?;
        `;
        const params = [channel_id];

        await this.connection.query(query, params);
    }

    async getLeaderboardEmbed(channel_id, type) {
        if (!['kills', 'deaths', 'wins', 'losses', 'kdr'].includes(type)) {
            return false;
        }

        const query = `
            SELECT ${type}_embed_id
            FROM leaderboards 
            WHERE channel_id = ?;
        `;
        const params = [channel_id];

        const res = await this.connection.query(query, params);

        if (res.length === 0) {
            return false;
        }

        return res[0][`${type}_embed_id`];
    }

    async hasLeaderboardEmbed(type) {
        const query = `
            SELECT ${type}_embed_id
            FROM leaderboards 
            WHERE ${type}_embed_id IS NOT NULL;
            WHERE ${type}_embed_id IS NOT NULL;
        `;

        const res = await this.connection.query(query);

        if (res.length === 0) {
            return false;
        }

        return true;
    }
}

module.exports = { Leaderboard };