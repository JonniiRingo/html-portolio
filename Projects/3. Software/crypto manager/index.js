import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const port = 3000

const app = express();


app.get("/", (req, res) => {

});

app.post("/", (req, res) => {

});

app.patch("/", (req, res) => {

});

app.delete("/", (req, res) => {

});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})