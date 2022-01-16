import { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Input, Button } from "@chakra-ui/react";

export default function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summonerData, setSummonerData] = useState({});

  const getSummonerData = async () => {
    setSubmitting(true);
    const response = await axios.get("http://localhost:3000/api/hello", {
      params: {
        name: summonerName,
      },
    });
    setSummonerData(await response);
    setSubmitting(false);
  };

  const handleSummonerName = (e) => setSummonerName(e.target.value);
  const handleSubmit = () => getSummonerData();

  console.log(summonerData.data);

  return (
    <Flex height='80vh' justify='center' align='center'>
      <Input
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
  );
}
