const db = require("../dbconfig/init");

module.exports = class Bird {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.age = data.age;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let birdData = await db.query("SELECT * FROM birds;");
        let birds = birdData.rows.map((bird) => new Bird(bird));
        resolve(birds);
      } catch (err) {
        reject("Birds not found");
      }
    });
  }
};
