const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.

console.log(process.env.MONGO_URL);

class Database {
  constructor() {
    this.connection = null;
  }

  async run() {
    try {
      const clientDb = new MongoClient(process.env.MONGO_URL);
      console.log("connecting");
      await clientDb.connect();
      this.connection = clientDb;
      console.log("connected");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Database;
