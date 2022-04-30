// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { headers } from "./headers/riot";

export default async function handler(req, res) {
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`;

  const response = await axios.get(url, {
    headers: headers,
  });

  const id = response.data.id;

  console.log(response.data);

  const newUrl = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;

  const nextResponse = await axios.get(newUrl, {
    headers: headers,
  });

  res.status(200).json(nextResponse.data);
}
