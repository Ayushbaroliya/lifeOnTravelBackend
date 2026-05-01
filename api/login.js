const cookie = require('cookie');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { password } = req.body || {};

    if (password === process.env.ADMIN_PASSWORD) {
      res.setHeader('Set-Cookie', cookie.serialize('admin_session', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      }));
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  res.status(405).json({ message: 'Method not allowed' });
};
