import { useState } from "react";
import axios from "axios";
import { Button, Flex, Input, Spacer } from "@chakra-ui/react";

export default function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerId, setSummonerId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summonerData, setSummonerData] = useState({});

  const getSummonerData = async () => {
    setSubmitting(true);
    const response = await axios.get("http://localhost:3000/api/hello", {
      params: {
        name: summonerName,
      },
    });

    console.log({ response });

    setSummonerData(await response);
    setSummonerId(await response.data[0].summonerId);
    setSubmitting(false);
  };

  const getMasteryData = async () => {
    const response = await axios.get("http://localhost:3000/api/mastery", {
      params: {
        id: summonerId,
      },
    });

    console.log({ response });
  };

  const handleSummonerName = (e) => setSummonerName(e.target.value);
  const handleSubmit = () => getSummonerData();

  const soloQueueData = summonerData?.data?.find((d) => {
    if (d.queueType === "RANKED_SOLO_5x5") {
      return d;
    }
  });

  const flexQueueData = summonerData?.data?.find((d) => {
    if (d.queueType === "RANKED_FLEX_SR") {
      return d;
    }
  });

  const Overview = ({ data }) => {
    const { leaguePoints, queueType, losses, wins, tier, rank, summonerName } =
      data;

    return (
      <div>
        <p>{summonerName}</p>
        <p>
          {`${
            queueType === "RANKED_SOLO_5x5" ? "Ranked Solo/Duo" : "Ranked Flex"
          }`}
          :{` `}
          {`${tier} ${rank} +${leaguePoints}`}
        </p>
        <p>Wins: {wins}</p>
        <p>Losses: {losses}</p>
      </div>
    );
  };

  return (
    <Flex direction='column'>
      <Flex height='20vh' justify='center' align='center'>
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onChange={handleSummonerName}
          value={summonerName}
          placeholder='Enter summoner name'
          width='25%'
          mr={4}
        />
        <Button onClick={handleSubmit} disabled={submitting}>
          Submit
        </Button>
      </Flex>
      <Flex direction='row' justify='center' align='center'>
        <Flex padding={10} borderRadius={1}>
          {soloQueueData && <Overview data={soloQueueData} />}
        </Flex>
        <Flex>{flexQueueData && <Overview data={flexQueueData} />}</Flex>
      </Flex>
    </Flex>
  );
}
