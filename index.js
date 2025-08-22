import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Server variables
const app = express();
const port = 3000;
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzgxZmE4YmJhOTgyNTkxZDZiYTgyYTljNzY2OTY2MSIsIm5iZiI6MTc1NTgzMjI0Mi41OTgsInN1YiI6IjY4YTdkZmIyNTg4ZWQ3NTJjNGVkMTc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6tWSII8obNlbb2xbKOYrGsOSnjXpK5zJ3h8GPPEmu4";

// Server config
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

app.post("/movie", async (req, res) => {
  const data = req.body;
  const id = data.id;
  const movie = data.movie;
  console.log(movie);

  //Movie search
  if (movie && !id) {
    try {
      const result = await axios.get(
        "https://api.themoviedb.org/3/search/movie?query=" + movie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(result.data.results.slice(0, 4));
      res.render("index.ejs", {
        movie: result.data.results.slice(0, 12),
      });
    } catch (error) {
      res.status(404).send("Error", error.message);
      console.log(error.message);
    }
  }

  //Search by id
  if (id && !movie) {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(result.data);
      res.render("index.ejs", {
        movie: result.data.movie_results,
      });
    } catch (error) {
      res.status(404).send("Error", error.message);
      console.log(error.message);
    }
  }

  //If user inputs a movie title and an ID, ID will override
  if (id && movie) {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id` ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(result.data.movie_results );
      res.render("index.ejs", {
        movie: result.data.movie_results ,
      });
    } catch (error) {
      res.status(404).send("Error", error.message);
      console.log(error.message);
    }
  }
});

// Server listen
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server has started on port ${port}.`);
});
