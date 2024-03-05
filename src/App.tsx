import { useEffect, useState } from "react";

import ResultsTable from "./Components/ResultsTable/ResultsTable";
import { results, rounds } from "./types/rounds";
import { Moment } from "moment";
import EditRoundModal from "./EditRoundModal/EditRoundModal";
import DeleteRoundModal from "./DeleteRoundModal/DeleteRoundModal";
import AddFirstRound from "./Components/AddFirstRound/AddFirstRound";

const BASE_SERVER_URL = "http://127.0.0.1:5000";

function App() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dalmutiResults, setDalmutiResults] = useState<rounds>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [roundToEdit, setRoundToEdit] = useState<results | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [roundToDelete, setRoundToDelete] = useState<results | undefined>();
  const [firstRound, setFirstRound] = useState<boolean>(false);

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
    setFirstRound(!rounds?.data?.results?.length);
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

  const editRound = async ({
    index,
    requestBody,
  }: {
    index: number;
    requestBody: {
      date?: Moment;
      results?: string[];
    };
  }) => {
    try {
      await fetch(BASE_SERVER_URL + "/edit-round/" + index, {
        method: "PATCH",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getResults();
    } catch (e) {
      console.error("Error while editing round:", e);
    }
  };

  const deleteRound = async ({ index }: { index: number }) => {
    try {
      await fetch(BASE_SERVER_URL + "/delete-round/" + index, {
        method: "DELETE",
      });
      getResults();
    } catch (e) {
      console.error("Error while deleting round:", e);
    }
  };

  const RenderExistingGame = () => {
    return (
      <>
        {!dataLoading && dalmutiResults && (
          <ResultsTable
            rounds={dalmutiResults}
            addNewRound={addNewRound}
            editModalOpenTrue={setEditModalOpenTrue}
            deleteModalOpenTrue={setDeleteModalOpenTrue}
          />
        )}
        {roundToEdit && (
          <EditRoundModal
            open={editModalOpen}
            onClose={setEditModalOpenFalse}
            roundInfo={roundToEdit}
            editRound={editRound}
          />
        )}
        {roundToDelete && (
          <DeleteRoundModal
            open={deleteModalOpen}
            onClose={setDeleteModalOpenFalse}
            roundInfo={roundToDelete}
            deleteRound={deleteRound}
          />
        )}
      </>
    );
  };

  const setEditModalOpenTrue = (round: results) => {
    setEditModalOpen(true);
    setRoundToEdit(round);
  };

  const setEditModalOpenFalse = () => {
    setEditModalOpen(false);
    setRoundToEdit(undefined);
  };

  const setDeleteModalOpenTrue = (round: results) => {
    setDeleteModalOpen(true);
    setRoundToDelete(round);
  };

  const setDeleteModalOpenFalse = () => {
    setDeleteModalOpen(false);
    setRoundToDelete(undefined);
  };

  return (
    <>
      {firstRound ? (
        <AddFirstRound createGame={addNewRound} />
      ) : (
        <RenderExistingGame />
      )}
    </>
  );
}

export default App;
