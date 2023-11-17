class LeaderboardWeek {
    constructor(leaderboard){
        this.leaderboard = leaderboard;
    }

    async init(){
        console.log('Initializing leaderboard week data...');
         await this.connection.query(`
            CREATE TABLE IF NOT EXISTS leaderboard_week (
                player_id VARCHAR(255),
                kills INT,
                deaths INT,
                wins INT,
                losses INT
            );
        `);


        console.log('Leaderboard week initialized');
    }

    async addPlayer(player_id){
        const query = `
        INSERT INTO leaderboard_week (player_id, kills, deaths, wins, losses) 
        VALUES (?, ?, ?, ?, ?);
        `;
        const params = [player_id, 0, 0, 0, 0];

        await this.leaderboard.connection.query(query, params);
    }

    async removePlayer(player_id){
        const query = `
        DELETE FROM leaderboard_week
        WHERE player_id = ?;
        `;
        const params = [player_id];

        await this.leaderboard.connection.query(query, params);
    }

    async getPlayers(){
        const query = `
        SELECT * FROM leaderboard_week;
        `;

        const res = await this.leaderboard.connection.query(query);

        return res;
    }


    async addKills(player_id, kills){
        const query = `
        UPDATE leaderboard_week
        SET kills = kills + ?
        WHERE player_id = ?;
        `;
        const params = [kills, player_id];

        await this.leaderboard.connection.query(query, params);
    }
    
    async addDeaths(player_id, deaths){
        const query = `
        UPDATE leaderboard_week
        SET deaths = deaths + ?
        WHERE player_id = ?;
        `;
        const params = [deaths, player_id];

        await this.leaderboard.connection.query(query, params);
    }

    async addWins(player_id, wins){
        const query = `
        UPDATE leaderboard_week
        SET wins = wins + ?
        WHERE player_id = ?;
        `;
        const params = [wins, player_id];

        await this.leaderboard.connection.query(query, params);
    }

    async addLosses(player_id, losses){
        const query = `
        UPDATE leaderboard_week
        SET losses = losses + ?
        WHERE player_id = ?;
        `;
        const params = [losses, player_id];

        await this.leaderboard.connection.query(query, params);
    }

    async reset(){
        const query = `
        UPDATE leaderboard_week
        SET kills = 0, deaths = 0, wins = 0, losses = 0;
        `;

        await this.leaderboard.connection.query(query);
    }

    
    async getTopKills(){
        const query = `
        SELECT * FROM leaderboard_week
        ORDER BY kills DESC
        LIMIT 5;
        `;

        const res = await this.leaderboard.connection.query(query);

        return res;
    }

    async getTopDeaths(){
        const query = `
        SELECT * FROM leaderboard_week
        ORDER BY deaths DESC
        LIMIT 5;
        `;

        const res = await this.leaderboard.connection.query(query);

        return res;
    }

    async getTopKdr(){
        const query = `
        SELECT * FROM leaderboard_week
        ORDER BY (kills/deaths) DESC
        LIMIT 5;
        `;

        const res = await this.leaderboard.connection.query(query);

        return res;
    }




    async getTopWins(){
        const query = `
        SELECT * FROM leaderboard_week
        ORDER BY wins DESC
        LIMIT 5;
        `;

        const res = await this.leaderboard.connection.query(query);

        return res;
    }

    async getTopPlayers() {
        const topKDR = await this.getTopKdr();
        const topWins = await this.getTopWins();
    

        return [...topKDR, ...topWins];
    }

}