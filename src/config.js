module.exports.clear = {
  public: process.env.CLEAR_PUBLIC,
  secret: process.env.CLEAR_SECRET,
};
module.exports.auth0 = {
  issuer: process.env.AUTH0_ISSUER,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};
module.exports.port = process.env.PORT || 8000;
