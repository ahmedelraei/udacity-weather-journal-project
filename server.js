const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//const bodyParser = require("body-parser");

app.use(express.urlencoded({extended: false}))

app.use(express.json())

projectData = {};

app.use(express.static("website"));



app.get("/all", (request, response) => response.status(200).send(projectData));
app.post("/add", (request, response) => {
  projectData = request.body;
  console.log(projectData);
  response.status(200).send(projectData);
})

const port = 8080;
const host = "127.0.0.1";


app.listen(port, _=> console.log(`Server running at http://${host}:${port}`));