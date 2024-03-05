import express from "express";
import axios from "axios";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("./index.ejs");
});

app.post("/submit", async (req, res) => {
    try {
        const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");

        if (response.data === false) {
            throw new Error("Failed to fetch ISS details");
        }

        var data = response.data;
        console.log(data);

        res.render("./index.ejs", { data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});