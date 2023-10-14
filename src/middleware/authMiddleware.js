const { verifyToken } = require("../utils/auth.js"); // Anda perlu mengganti ini dengan logika sesuai kebutuhan

const authenticateUser = (request, response, next) => {
  const token = request.headers.authorization; // Anda perlu menyesuaikan ini dengan cara Anda mengirim token

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  // Verifikasi token
  verifyToken(token, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    request.user = decoded; // Setel informasi pengguna ke dalam objek permintaan
    next();
  });
};

module.exports = {
  authenticateUser,
};
