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

module.exports = { index, show };
