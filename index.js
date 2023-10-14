const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");

const app = express()

const morgan = require('morgan')
const router = require('./src/routes/index.js')

require("dotenv").config

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Movies",
      version: "0.1.0",
      description: "This is a simple endpoint for get all roles.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

app.use(morgan("tiny"));
app.use(express.json());
app.use(router, swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));


const port = process.env.PORT
app.listen(port, () => console.log(`server is running in port ${port}...`))
