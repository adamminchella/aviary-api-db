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
        let birdData = await db.query("SELECT * FROM birds ORDER BY id ASC");
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
        reject("Bird not found");
      }
    });
  }

  static async doesBirdExist(name) {
    let birdData = await db.query(`SELECT * FROM birds WHERE name = $1;`, [
      name,
    ]);
    if (birdData.rows.length == 0) {
      return false;
    }
    return birdData.rows[0];
  }

  static async create(birdData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, age } = birdData;
        let result = await db.query(
          `INSERT INTO birds (name, age) VALUES ($1, $2) RETURNING id`, // WHY ONLY ID ???
          [name, age]
        );
        console.log(new Bird(result.rows[0]));
        resolve(result.rows[0]);
      } catch (err) {
        reject("Bird could not be created");
      }
    });
  }

  static async update(birdData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, age, id } = birdData;
        console.log(birdData);
        let result = await db.query(
          `UPDATE birds SET name = $1, age = $2 WHERE id = $3 RETURNING id`,
          [name, age, id]
        );
        resolve(result.rows[0]);
      } catch (err) {
        reject("Bird could not be updated");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM birds WHERE id = ${this.id}`
        );
        resolve("Bird was destroyed");
      } catch (err) {
        reject("Bird could not be destroyed");
      }
    });
  }
};
