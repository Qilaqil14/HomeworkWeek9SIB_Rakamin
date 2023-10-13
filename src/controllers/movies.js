const pool = require("../config/database.js");

const getMovies = (request, response) => {
  pool.query("SELECT * FROM movies", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const getMoviesId = (request, response) => {
  const id = request.params.id
  pool.query(`SELECT * FROM movies WHERE id = ${id}`, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const addMovies = (request, response) => {
  // const { title, genres, year } = request.body;
  // console.log(request.body)

  pool.query(
    `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
    [req.body.title, req.body.genres, req.body.year],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
};

const updateMovies = (request, response) => {
  const id = request.params.id;
  const { title, genres, year } = request.body;

  pool.query(
    "UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4",
    [title, genres, year, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Movie with ID ${id} updated successfully`);
    }
  );
};


const deleteMovies = (request, response) => {
  const id = request.params.id

  pool.query(`DELETE FROM movies WHERE id = $1`, [id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Movies delete with ID: ${id}`)
  } )
}


module.exports = {
  getMovies,
  getMoviesId,
  addMovies,
  updateMovies,
  deleteMovies,
};
