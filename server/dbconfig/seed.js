const db = require("./init");
const fs = require("fs");
const seeds = fs.readFileSync(__dirname + "/seedbirds.sql").toString();
db.query(seeds, () => console.log("Data seeded"));
