// Model is a representation of the data in our code
// Models will represent the data in our database
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

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let birdData = await db.query(`SELECT * FROM birds WHERE id = $1;`, [
          id,
        ]);
        let bird = new Bird(birdData.rows[0]);
        resolve(bird);
      } catch (err) {
        reject("Mildred not found");
      }
    });
  }
};
