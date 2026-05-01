const cookie = require('cookie');

function isAuthenticated(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const adminCookie = cookies.admin_session;
  return adminCookie === process.env.ADMIN_PASSWORD;
}

module.exports = { isAuthenticated };
