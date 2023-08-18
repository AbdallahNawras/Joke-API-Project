import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev";

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    res.render("index.ejs", {emoji1: '😉'});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req,res) => {
  const catName = req.body['catSelect'];
  const langName = req.body['langSelect'];
  const flagName = req.body['flagSelect']; 
  try {
      if(!flagName) {
        const response = await axios.get(API_URL + "/joke/" + catName + "?lang=" + langName );
        const result = response.data;
        res.render("index.ejs", { text: 'Here\'s a joke ', data: result, emoji: '😂' });
      }
      else {
        const response = await axios.get(API_URL + "/joke/" + catName + "?lang=" + langName + "&blacklistFlags=" + flagName);
        const result = response.data;
        res.render("index.ejs", { data: result, emoji: '😂'});
      }

      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
});

app.listen(port, ()=> {
    console.log(`Server is running op port ${port}`);
});