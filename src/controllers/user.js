const pool = require("../config/database.js");
const { signToken } = require("../utils/auth.js");

const getUsers = (request, response) => {
  pool.query(
    `SELECT * FROM users ${
      request.query.limit ? "LIMIT " + request.query.limit : ""
    } `,
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

const registerUser = (request, response) => {
  const { email, password } = request.body;
  // Lakukan validasi data pengguna jika diperlukan

  pool.query(
    `INSERT INTO users (email, password) VALUES ($1, $2)`,
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        // Setelah registrasi berhasil, buat token
        const token = signToken({ email }); // Anda perlu mengganti ini dengan logika sesuai kebutuhan
        response.json({
          token: token,
        });
      }
    }
  );
};

const loginUser = (request, response) => {
  const { email, password } = request.body;
  // Lakukan validasi data pengguna jika diperlukan

  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      } else if (results.rows.length > 0) {
        // Jika login berhasil, buat token
        const token = signToken({ email }); // Anda perlu mengganti ini dengan logika sesuai kebutuhan
        response.json({
          token: token,
        });
      } else {
        response.status(401).json({
          error: "Invalid email or password",
        });
      }
    }
  );
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
