const JwtLruCache = require('jsonwebtoken-lru-cache');
const config = require('./config');

const jwtCache = new JwtLruCache(1024 * 1024 * 10, config.auth0.clientSecret, {
  issuer: config.auth0.issuer,
  audience: config.auth0.clientId,
  algorithms: ['HS256'],
});

module.exports.getToken = (req) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(/\s+/, 2);
    if (type === 'Basic') return token;
    return req.query.token;
  } return null;
};

module.exports.verifyToken = async (reqOrToken) => jwtCache.verifyAsync(
  typeof reqOrToken === 'string' ? reqOrToken : this.getToken(reqOrToken)
);
