const mongoose = require('mongoose');
const Map = require('../../src/server/models/map.js');
const User = require('../../src/server/models/user.js');

mongoose.connect('mongodb://localhost/test');

describe('Map', () => {

  afterAll(() => {
    mongoose.connection.db.dropDatabase();
  });

  test('create a new map', async () => {
    expect.assertions(3);

    const userOptions = {
      username: 'Arteezy',
      password: 'prteezy',
    };
    const userResponse = await User.create(userOptions);

    const mapOptions = {
      user: userResponse._id,
      name: 'Test Map',
      tree: {
        someKey: 'someValue',
      },
    };
    const mapResponse = await Map.create(mapOptions);

    expect(mapResponse.user).toBe(mapOptions.user);
    expect(mapResponse.name).toBe(mapOptions.name);
    expect(mapResponse.tree).toEqual(mapOptions.tree);
  });

  test('retrieve maps by user', async () => {
    expect.assertions(3);

    const user = await User.findOne({ username: 'Arteezy' });
    const response = await Map.findOne({ user: user._id });

    expect(response.user).toEqual(user._id);
    expect(response.name).toBe('Test Map');
    expect(response.tree).toEqual({ someKey: 'someValue' });
  });

  test('retrieve map by id', async () => {
    expect.assertions(2);

    const user = await User.findOne({ username: 'Arteezy' });
    const mapOptions = {
      user: user._id,
      name: 'Test Map Two',
      tree: {
        eg: 'bleed blue',
      },
    };

    const map = await Map.create(mapOptions);

    const response = await Map.findOne({ _id: map._id });

    expect(response.name).toBe(mapOptions.name);
    expect(response.tree).toEqual(mapOptions.tree);
  });

});
