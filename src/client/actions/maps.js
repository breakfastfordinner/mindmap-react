import axios from 'axios';
import Cookies from 'universal-cookie';

const API = 'http://localhost:8000/api/maps';
const cookies = new Cookies();

/**
 * Retrieves all maps for the current user
 * @return {Promise} A Promise that resolves with an array of maps.
 */
const getMaps = async () => {
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'get',
      baseURL: API,
      params: {
        user: cookie.user._id,
      },
      headers: {
        Authorization: cookie.auth_token,
      },
    };

    const response = await axios(options);


    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Returns a user's map with the specified id.
 * @param {String} id The id of the desired map.
 * @return {Promise} A Promise that resolves in the specified map.
 */
const getMap = async (id) => {
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'get',
      baseURL: API,
      url: `${id}`,
      headers: {
        Authorization: cookie.auth_token,
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Create a new, empty map.
 * @return {Promise} A Promise that resolves in the created map.
 */
const createMap = async (name) => {
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'post',
      baseURL: API,
      url: '/create',
      headers: {
        Authorization: cookie.auth_token,
      },
      data: {
        user: cookie.user._id,
        name,
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Edit the map with the specified id.
 * @param {String} id The id of the map to edit.
 * @param {Object} map The new map (will overwrite the old one).
 * @return {Promise} A Promise that resolves in the edited map.
 */
const editMap = async (id, tree) => {
  // console.log('beginning of editmap: ', tree, id)
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'put',
      baseURL: API,
      url: `/edit/${id}`,
      headers: {
        Authorization: cookie.auth_token,
      },
      data: {
        tree,
      },
    };

    const response = await axios(options);
    // console.log('here???', response.data)

    return response.data;
  } catch (error) {
    // console.log('here?==============', error)
    return error;
  }
};

/**
 * Edit the map name of the map with the specified id.
 * @param  {String} id The id of the map to edit.
 * @param  {String} name The new name of the map.
 * @return {Promise} A Promise that resolves in the edited map.
 */
const editMapName = async (id, name) => {
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'put',
      baseURL: API,
      url: `/edit/name/${id}`,
      headers: {
        Authorization: cookie.auth_token,
      },
      data: {
        name,
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Destroy the map with the specified id.
 * @param  {Number} id The id of the map to delete
 * @return {Promise} A promise that resolves in a Mongoose Query?
 */
const destroyMap = async (id) => {
  try {
    const cookie = cookies.get('user');
    const options = {
      method: 'delete',
      baseURL: API,
      url: `/destroy/${id}`,
      headers: {
        Authorization: cookie.auth_token,
      },
    };

    const response = await axios(options);

    return response; // no data on this one?
  } catch (error) {
    return error;
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
