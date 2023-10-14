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
 *     summary: Get all Movies
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
 *   post:
 *     summary: Create a new Movies
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         description: The created movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 * /movies/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Movies id
 *     responses:
 *       200:
 *         description: The movies
 *  response by id *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       404:
 *         description: The movies was not found
 *   put:
 *    summary: Update the movies by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movies id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The movies was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The movies was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the movies by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movies id
 *
 *     responses:
 *       200:
 *         description: The movies was deleted
 *       404:
 *         description: The movies was not found
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
