const swaggerJSdoc = require("swagger-jsdoc");
const express = require("express");
// const swaggerUI = require("swagger-ui-express");

const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "moshina bozor server",
      version: "1.0.0",
      description: "moshina bozor web sayti uchun maxsus tayorlandi",
    },
    servers: [
      {
        url: `${process.env.HOST}`, // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js", "./index.js"], // Path to your API routes
};

const swaggerDocs = swaggerJSdoc(swaggerOptions);

module.exports = swaggerDocs;
