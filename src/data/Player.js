class Player {
    constructor(id, name, database) {
        this.id = id;
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

    init() {
    
        const playerdata = this.database.query(`SELECT * FROM cw_players WHERE id = $1;`, [this.id]);
        if (!playerdata) {
            console.log('Player not found, creating new entry...');
        } else {
            playerdata.then((res) => {
                if (res.rows.length === 0) {
                    console.log('Player not found');
                } else {
                    const row = res.rows[0];
                    this.stats = {
                        kills: row.kills,
                        deaths: row.deaths,
                        wins: row.wins,
                        losses: row.losses,
                    };
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    async save() {
        if (!this.database.connection) return;
        await this.database.query(`UPDATE cw_players SET kills = $1, deaths = $2, wins = $3, losses = $4 WHERE id = $5;`, [this.stats.kills, this.stats.deaths, this.stats.wins, this.stats.losses, this.id]).then(() => {
            console.log('Player data saved');
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = { Player };