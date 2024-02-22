import { useEffect, useState } from "react";

import AddButton from "./Components/AddButton/AddButton";
import ResultsTable from "./Components/ResultsTable/ResultsTable";

function App() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dalmutiRounds, setDalmutiRounds] = useState([]);

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

    setDalmutiRounds(rounds.data);
    setDataLoading(false);
  };

  return (
    <>
      {!dataLoading && dalmutiRounds && <ResultsTable rounds={dalmutiRounds} />}
      <AddButton />
    </>
  );
}

export default App;
