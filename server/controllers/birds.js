const Bird = require("../models/Bird");

async function index(req, res) {
  try {
    const birds = await Bird.all;
    res.status(200).json(birds);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function show(req, res) {
  try {
    const bird = await Bird.findById(req.params.id);
    res.status(200).json(bird);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function create(req, res) {
  try {
    const foundBird = await Bird.doesBirdExist(req.body.name);
    if (foundBird) {
      throw new Error("Bird already exists");
    } else {
      const newBird = await Bird.create(req.body);
      console.log(newBird);
      res.status(201).json(newBird);
    }
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
}

async function destroy(req, res) {
  try {
    const bird = await Bird.findById(req.params.id);
    const resp = await bird.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function update(req, res) {
  try {
    const bird = await Bird.update(req.body);
    res.status(200).json(bird);
  } catch (err) {
    res.status(417).json({ err });
  }
}

async function edit(req, res) {
  res.status(501);
}

async function neww(req, res) {
  res.status(501);
}

module.exports = { index, show, create, destroy, update, edit, neww };
