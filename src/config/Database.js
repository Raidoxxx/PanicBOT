const moongose = require('mongoose');
require('dotenv').config();
const MongoURL = process.env.MONGO_URL;

class Database {
  constructor() {
   this.connection = null;
  }

    async connect() {
        console.log('Connecting to database...');
        moongose.connect(MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Connected to database!');
            this.connection = moongose.connection;
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Database;