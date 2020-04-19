/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
require('dotenv').config();
const app = require('express')();
const { clearPermission, registeredFor } = require('./datasources/clear');
const { verifyToken } = require('./auth');
const { port } = require('./config');

const permissionValues = {
  manager: 0, volunteer: 1, staff: 1, judge: 2, mentor: 3,
};

app.get('/', async (req, res) => {
  const { email, username } = await verifyToken(req);
  const events = (await Promise.all([
    (async () => { try { return await registeredFor(email); } catch (err) { return []; } })(),
    (async () => { try { return await clearPermission(username); } catch (err) { return []; } })(),
  ]))
    .filter((row) => Array.isArray(row))
    .reduce((accum, row) => [...accum, ...row], [])
    .reduce((accum, row) => {
      // Grant the highest permission
      if (accum[row.id]) {
        if (
          (row.type in permissionValues && permissionValues[accum[row.id]] >= permissionValues[row.type])
          || accum[row.id] === 'attendee'
        ) {
          accum[row.id] = row.type;
        }
      } else accum[row.id] = row.type;
      return accum;
    }, {});

  res.send(events);
});

app.listen(port, () => console.log(`listening on http://0.0.0.0:${port}`));
