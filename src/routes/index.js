/**
 * @swagger
 * components:
 *    schemas:
 *      Movies:
 *        type: object
 *        required:
 *          - id
 *          - title
 *          - genre
 *          - year
 *        properties:
 *          id:
 *            type: integer
 *            description: Id in Movies.
 *          title:
 *            type: string
 *            description: Title in Movies.
 *          genres:
 *            type: string
 *            description: Genres in Movies.
 *          year:
 *            type: string
 *            description: year in Movies.
 *        example:
 *          id: 1
 *          title: Superman
 *          genre: Komedy
 *          year: 2002
 */

/**
 * @swagger
 * tags:
 *    name: Movies
 *    description: The Movies managing API
 * /movies:
 *   get:
 *     summary: Get all roles
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Get all Movies.
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movies'
 *       500:
 *        description: Something went wrong
 */

const router = require("express").Router();
const jwt = require('jsonwebtoken')
require("dotenv")
const {
  getMovies,
  getMoviesId,
  addMovies,
  updateMovies,
  deleteMovies,
  getMoviesPagination,
} = require("../controllers/movies");
const { getUsers, postUsers } = require("../controllers/users");

router.route("/movies").get(getMovies);
router.route("/movies/:id").get(getMoviesId);
router.route("/movies").post(addMovies);
router.route("/movies/:id").put(updateMovies);
router.route("/movies/:id").delete(deleteMovies);

router.route("/users").get(getUsers);
router.route("/login").post(postUsers);

module.exports = router;
