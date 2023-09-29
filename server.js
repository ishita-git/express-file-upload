const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(403).json({ error: 'Unauthorized CORS request' });
  } else {
    next(err);
  }
});

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
