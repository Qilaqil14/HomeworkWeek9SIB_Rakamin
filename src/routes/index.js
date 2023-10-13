const router = require("express").Router();
const { getMovies, getMoviesId, addMovies, updateMovies, deleteMovies } = require("../controllers/movies");

router.route("/movies").get(getMovies);
router.route("/movies/:id").get(getMoviesId);
router.route("/movies").post(addMovies);
router.route("/movies/:id").put(updateMovies);
router.route("/movies/:id").delete(deleteMovies);

module.exports = router;
