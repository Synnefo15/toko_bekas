const express = require("express");
const app = express();
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const formidable = require('express-formidable');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const port = process.env.PORT || 5000;

// Load env variable
dotenv.config();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// &---- Swagger ----
const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: "E-commerce API SHAP",
      description: "E-commerce API Information Swagger",
      contact: {
        name: "FWS 11 Kelompk 5 SHAP",
      },
      servers: ["https://localhost:5000"],
    },
  },
  apis: ["./routes/routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOption);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(formidable());

app.use(formidable());
app.use(require('./routes/routes.js')) // &---- Routes ----
app.use('/api-docs',swaggerUi.serve,
        swaggerUi.setup(swaggerDocs)
) // &---- Swagger ----



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
