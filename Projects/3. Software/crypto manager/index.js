import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const port = 3000

const app = express();


app.get("/", async (req, res) => {

});

app.post("/", async (req, res) => {

});

app.patch("/", async (req, res) => {

});

app.delete("/", async (req, res) => {

});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})