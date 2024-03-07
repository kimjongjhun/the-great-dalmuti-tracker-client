import { useEffect, useState } from "react";

import ResultsTable from "./Components/ResultsTable/ResultsTable";
import { results, rounds } from "./types/rounds";
import EditRoundModal from "./EditRoundModal/EditRoundModal";
import DeleteRoundModal from "./DeleteRoundModal/DeleteRoundModal";
import AddFirstRound from "./Components/AddFirstRound/AddFirstRound";
import { getResults, addNewRound, editRound, deleteRound } from "./api/rounds";

function App() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dalmutiResults, setDalmutiResults] = useState<rounds>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [roundToEdit, setRoundToEdit] = useState<results | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [roundToDelete, setRoundToDelete] = useState<results | undefined>();
  const [firstRound, setFirstRound] = useState<boolean>(false);

  useEffect(() => {
    getResultsWrapper();
  }, []);

  const getResultsWrapper = async () => {
    const results = await getResults();
    handleApiCallEnd(results);
  };

  const addNewRoundWrapper = async ({
    requestBody,
  }: {
    requestBody: {
      date: moment.Moment;
      results: string[];
    };
  }) => {
    const results = await addNewRound({ requestBody });
    handleApiCallEnd(results);
  };

  const editRoundWrapper = async ({
    index,
    requestBody,
  }: {
    index: number;
    requestBody: {
      date?: moment.Moment | undefined;
      results?: string[] | undefined;
    };
  }) => {
    const results = await editRound({
      index,
      requestBody,
    });
    handleApiCallEnd(results);
  };

  const deleteRoundWrapper = async ({ index }: { index: number }) => {
    const results = await deleteRound({ index });
    handleApiCallEnd(results);
  };

  const handleApiCallEnd = (results: {
    data: {
      numberOfPlayers: number;
      results: results[];
    };
    message: string;
  }) => {
    setDalmutiResults(results.data);
    setFirstRound(!results?.data?.results?.length);
    setDataLoading(false);
  };

  const RenderExistingGame = () => {
    return (
      <>
        {!dataLoading && dalmutiResults && (
          <ResultsTable
            rounds={dalmutiResults}
            addNewRound={addNewRoundWrapper}
            editModalOpenTrue={setEditModalOpenTrue}
            deleteModalOpenTrue={setDeleteModalOpenTrue}
          />
        )}
        {roundToEdit && (
          <EditRoundModal
            open={editModalOpen}
            onClose={setEditModalOpenFalse}
            roundInfo={roundToEdit}
            editRound={editRoundWrapper}
          />
        )}
        {roundToDelete && (
          <DeleteRoundModal
            open={deleteModalOpen}
            onClose={setDeleteModalOpenFalse}
            roundInfo={roundToDelete}
            deleteRound={deleteRoundWrapper}
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
        <AddFirstRound createGame={addNewRoundWrapper} />
      ) : (
        <RenderExistingGame />
      )}
    </>
  );
}

export default App;
