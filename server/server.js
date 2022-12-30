console.log("This Server Script is Running");

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
// the aboev line is to allow cross origin requests i.e. requests from frotnened to the server
app.use(express.json());
//aboev line is to allow us to send json data to the backend from the frontend

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Wake Up Jarvis, Daddy's Home",
  });
});
//the above is a get request to the server i.e. it gets or receives data from the server


// the below is a post request to the server i.e. it sends data to the server
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:`${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
        bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error })
  }
});


//to make server always listens for your requests
app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));