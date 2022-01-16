// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`;

  const response = await axios.get(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });
  res.status(200).json(response.data);
}
