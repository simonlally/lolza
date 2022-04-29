import axios from "axios";
import { headers } from "./headers/riot";

export default async function handler(req, res) {
  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.query.id}`;
  // const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`;

  const response = await axios.get(url, {
    headers: headers,
  });

  res.status(200).json(response.data);
}
