const axios = require('axios');
const querystring = require('querystring');
const config = require('../config');

const clearBase = 'https://clear.codeday.org/api';
// eslint-disable-next-line require-jsdoc
const makeRequest = async (endpoint, query = {}) => (await axios.get(
  `${clearBase}${endpoint}?${querystring.stringify({ ...config.clear, ...query })}`,
  { maxRedirects: 0 }
)).data;

module.exports.clearPermission = async (username) => (await makeRequest('/events/has-access', { username }))
  .map((e) => ({ id: e.id, type: 'manager' }));
module.exports.registeredFor = async (email) => (await makeRequest(`/registration/by-email/${encodeURI(email)}`))
  .all_registrations
  .map((e) => ({ id: e.event.id, type: e.type }));
