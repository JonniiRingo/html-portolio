//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var userIsAuthorised = false;

function passwordCheck(req, res, next) {
    console.log('req.body:', req.body);
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
      userIsAuthorised = true;
    }
    next();
  }
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/password_check', (req, res) => {
    const password = req.body.password;
    if (password === "ILoveProgramming") {
      res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
