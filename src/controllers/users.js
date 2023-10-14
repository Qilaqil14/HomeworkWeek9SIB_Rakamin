const pool = require("../config/database.js");
var { signToken } = require("../utils/auth.js");

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


const postUsers = (request, response) => {
  const { email, password} = request.params.body
  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        const token = signToken(results.rows[0]);
        response.json({
          token: token,
        });
      }
    }
  );
};

module.exports = {
  getUsers,
  postUsers,
}
