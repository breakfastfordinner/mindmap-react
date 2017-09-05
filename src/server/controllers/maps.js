const Map = require('../models/map');
require('../models/user');

/**
 * Retrieves all maps for the current user.
 * Expects to receive a user id string in the request params.
 *
 * @return {Promise} A Promise that resolves with an array of maps.
 */
const getMaps = async (req, res) => { // TESTED
  try {
    const user = req.query.user;
    const maps = await Map.find({ user });

    if (!maps) {
      res.status(400).json({ error: `No maps for user ${user}` });
    } else {
      res.status(200).json({ maps });
    }
  } catch (error) {
    console.log('get rekt');
    res.status(500).json({ error });
  }
};

/**
 * Retrieves a user's map with the specified id.
 * Expects a user id to be specified in the request parameters.
 * @return {Promise} A Promise that resolves in the specified map.
 */
const getMap = async (req, res) => { // TESTED
  try {
    const _id = req.params.id;
    console.log(_id);

    const map = await Map.findById(_id);

    if (!map) {
      res.status(400).json({ error: `No map with id ${_id}` });
    } else {
      res.status(200).json({ map });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Create a new, empty map.
 * @return {Promise} A Promise that resolves in the created map.
 */
const createMap = async (req, res) => { // TESTED
  try {
    const user = req.body.user;
    const name = req.body.name;

    const options = {
      user,
      name,
      tree: [{ name: 'Place holder', children: [] } ],
    };

    const map = await Map.create(options);

    if (!map) {
      res.status(400).json({ error: `No map created for user ${user}` });
    } else {
      res.status(200).json({ map });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Edit the map with the specified id.
 * Expects to receive a map id string in the request parameters.
 * @return {Promise} A Promise that resolves in the edited map.
 */
const editMap = async (req, res) => { // TESTED
  // console.log('=============', req.body.tree, '=====================')
  try {
    const _id = req.params.id;
    const tree = req.body.tree;

    const options = [
      _id,
      { tree },
      { new: true },
    ];

    const map = await Map.findByIdAndUpdate(...options);

    if (!map) {
      res.status(400).json({ error: `Map ${_id} was not edited` });
    } else {
      res.status(200).json({ map });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Edit the map name of the map with the specified id.
 * Expects to receive a map id string in the request parameters.
 * Expects to receive a new name string in the request body.
 * @return {Promise} A Promise that resolves in the edited map.
 */
const editMapName = async (req, res) => { // TESTED
  try {
    const _id = req.params.id;
    const name = req.body.name;

    const options = [
      _id,
      { name },
      { new: true },
    ];

    const map = await Map.findByIdAndUpdate(...options);

    if (!map) {
      res.status(400).json({ error: `Map ${_id} was not edited` });
    } else {
      res.status(200).json({ map });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Destroy the map with the specified id.
 * @return {Promise} A Promise that resolves in a Mongoose Query?
 */
const destroyMap = async (req, res) => { // TESTED
  try {
    const _id = req.params.id;

    const map = await Map.findByIdAndRemove(_id);

    if (!map) {
      res.status(400).json({ error: `Map ${_id} was not removed` });
    } else {
      res.status(200).json({ map });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getMaps,
  getMap,
  createMap,
  editMap,
  editMapName,
  destroyMap,
};
