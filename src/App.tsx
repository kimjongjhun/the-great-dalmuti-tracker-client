import { useEffect, useState } from "react";

import ResultsTable from "./Components/ResultsTable/ResultsTable";
import { rounds } from "./types/rounds";
import { Moment } from "moment";

const BASE_SERVER_URL = "http://127.0.0.1:5000";

function App() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dalmutiResults, setDalmutiResults] = useState<rounds>();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    let response, rounds;

    try {
      response = await fetch(BASE_SERVER_URL + "/get-all-rounds");
      rounds = await response.json();
    } catch (e) {
      console.error("Error while fetching data:", e);
    }

    setDalmutiResults(rounds.data);
    setDataLoading(false);
  };

  const addNewRound = async ({
    requestBody,
  }: {
    requestBody: {
      date: Moment;
      results: string[];
    };
  }) => {
    try {
      await fetch(BASE_SERVER_URL + "/add-new-round", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getResults();
    } catch (e) {
      console.error("Error while saving round:", e);
    }
  };

  return (
    <>
      {!dataLoading && dalmutiResults && (
        <ResultsTable rounds={dalmutiResults} addNewRound={addNewRound} />
      )}
    </>
  );
}

export default App;
