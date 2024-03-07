import { Moment } from "moment";

const BASE_SERVER_URL = "http://127.0.0.1:5000";
const PAGE = "/rounds";

const getResults = async () => {
  let response, rounds;

  try {
    response = await fetch(BASE_SERVER_URL + PAGE + "/get-all");
    rounds = await response.json();
  } catch (e) {
    console.error("Error while fetching data:", e);
  }

  return rounds;
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
    await fetch(BASE_SERVER_URL + PAGE + "/add", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await getResults();
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
    await fetch(BASE_SERVER_URL + PAGE + "/edit/" + index, {
      method: "PATCH",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await getResults();
  } catch (e) {
    console.error("Error while editing round:", e);
  }
};

const deleteRound = async ({ index }: { index: number }) => {
  try {
    await fetch(BASE_SERVER_URL + PAGE + "/delete/" + index, {
      method: "DELETE",
    });
    return await getResults();
  } catch (e) {
    console.error("Error while deleting round:", e);
  }
};

export { getResults, addNewRound, editRound, deleteRound };
