import { useEffect, useState } from "react";

import AddButton from "./Components/AddButton/AddButton";
import ResultsTable from "./Components/ResultsTable/ResultsTable";
import { rounds } from "./types/rounds";

function App() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dalmutiResults, setDalmutiResults] = useState<rounds>();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    let response, rounds;

    try {
      response = await fetch("http://127.0.0.1:5000/get-all-rounds");
      rounds = await response.json();
    } catch (e) {
      console.error("Error while fetching data:", e);
    }

    setDalmutiResults(rounds.data);
    setDataLoading(false);
  };

  return (
    <>
      {!dataLoading && dalmutiResults && (
        <ResultsTable rounds={dalmutiResults} />
      )}
      <AddButton />
    </>
  );
}

export default App;
