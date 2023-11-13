class Player {
    constructor(id, dc_id, name, database) {
        this.id = id;
        this.dc_id = dc_id;
        this.name = name;
        this.database = database;
        
        this.stats = {
            kills: 0,
            deaths: 0,
            wins: 0,
            losses: 0,
        };
        this.init();
    }

    //
    async init() {
        if (!this.database) return;
    
        try {
            const query = `
                SELECT * 
                FROM cw_players 
                WHERE id = ?;
            `;
            const params = [this.id];
            const res = await this.database.query(query, params);
    
            if (res.length === 0) {
                const insertQuery = `
                    INSERT INTO cw_players (id, discord_id, username, kills, deaths, wins, losses) 
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                `;
                const insertParams = [this.id, this.dc_id, this.name, this.stats.kills, this.stats.deaths, this.stats.wins, this.stats.losses];
                await this.database.query(insertQuery, insertParams);
            } else {
                this.stats = {
                    kills: res[0].kills,
                    deaths: res[0].deaths,
                    wins: res[0].wins,
                    losses: res[0].losses,
                };
            }
        } catch (err) {
            console.log(err);
        }
    }

    async save() {
        console.log('Saving player data...');

        const query = `
            UPDATE cw_players
            SET kills = ?, deaths = ?, wins = ?, losses = ?
            WHERE id = ?;
        `;

        const params = [this.stats.kills, this.stats.deaths, this.stats.wins, this.stats.losses, this.id];

        await this.database.query(query, params);
    }

    get username() {
        return this.name;
    }

    get kills() {
        return this.stats.kills;
    }

    get deaths() {
        return this.stats.deaths;
    }

    get wins() {
        return this.stats.wins;
    }

    get losses() {
        return this.stats.losses;
    }

    get kdr() {
        return this.stats.kills / this.stats.deaths || 0;
    }

    get wl() {
        return this.stats.wins / this.stats.losses || 0;
    }

    addKill(kills) {
        this.stats.kills += kills;
    }

    addDeath(deaths) {
        this.stats.deaths += deaths;
    }

    addWin(wins) {
        this.stats.wins += wins;
    }

    addLoss(losses) {
        this.stats.losses += losses;
    }

    addStats(kills, deaths, wins, losses) {
        return new Promise((resolve, reject) => {
            this.stats.kills += kills;
            this.stats.deaths += deaths;
            this.stats.wins += wins;
            this.stats.losses += losses;
            resolve();
        });
    }

    removeStats(kills, deaths, wins, losses) {
        return new Promise((resolve, reject) => {
            this.stats.kills -= kills;
            this.stats.deaths -= deaths;
            this.stats.wins -= wins;
            this.stats.losses -= losses;
            resolve();
        });
    }

    resetStats() {
        return new Promise((resolve, reject) => {
            this.stats.kills = 0;
            this.stats.deaths = 0;
            this.stats.wins = 0;
            this.stats.losses = 0;
            resolve();
        });
    }
}

module.exports = { Player };