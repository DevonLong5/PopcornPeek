import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";


// Directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Server variables
const app = express();
const port = 3000;


// Server config
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {

    });
});

// Server listen
app.listen(port, () => {
    console.log(`Server has started on port ${port}.`)
});
