const mongoose = require('mongoose');
const User = require('../../src/server/models/user.js');

mongoose.connect('mongodb://localhost/test');

describe('User', () => {

  afterAll(() => {
    mongoose.connection.db.dropDatabase();
  });

  test('create a new user', async () => {
    expect.assertions(1);

    const username = 'Arteezy';
    const password = 'prteezy';
    const userOptions = { username, password };

    const response = await User.create(userOptions);

    expect(response.username).toBe(username);
  });

  test ('retrieve user by username', async () => {
    expect.assertions(1);

    const username = 'Arteezy';

    const response = await User.findOne({ username });

    expect(response.username).toBe(username);
  });

  test('hash a user\'s password', async () => {
    expect.assertions(1);

    const username = 'Arteezy';
    const password = 'prteezy';

    const response = await User.findOne({ username });

    expect(response.password).not.toMatch(password);
  });
});
