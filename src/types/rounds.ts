interface rounds {
  numberOfPlayers: number;
  results: results[];
}

interface results {
  date: Date;
  index: number;
  playerOrder: string[];
}

export type { rounds, results };
