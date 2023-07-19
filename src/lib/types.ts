export type CardDiscardedPayload = {
  gameStateId: string;
  cardId: string;
  lobbyId: string;
  playerId: string;
};

export type ChangeTurnPayload = {
  gameStateId: string;
  lobbyId: string;
  playerId: string;
};

export type CreateLobbyPayload = {
  playerId: string;
};

export type GameOverPayload = {
  lobbyId: string,
  gameStateId: string,
};

export type JoinLobbyPayload = {
  playerId: string;
  lobbyId: string;
};

export type LeaveLobbyPayload = {
  playerId: string;
  lobbyId: string;
};

export type RetrieveGameStatePayload = {
  gameStateId: string,
  reconnectingPlayer: {
    username: string;
    id: string;
  };
};

export type SaveGameStatePayload = {
  gameState: GameState,
};

export type MatchCardsPayload = {
  playerId: string;
  card1Id: string;
  card2Id: string;
  gameStateId: string;
  lobbyId: string;
};

export type PickedCardPayload = {
  playerPreviousId: string;
  playerNewId: string;
  cardId: string;
  gameStateId: string;
  lobbyId: string;
  fromOpponent: boolean;
};

export type PlayedCardPayload = {
  playerId: string;
  targetPlayerId?: string;
  cardId: string;
  tableId: string;
  lobbyId: string;
  gameStateId: string;
};

export type SendMessagePayload = {
  playerId: string;
  lobbyId: string;
  message: string;
};

export type StartGamePayload = {
  lobbyId: string,
};

export type UserConnectPayload = {
  username: string;
  lobbyId?: string;
};

export type UserDisconnectPayload = {
  playerId: string;
  lobbyId?: string;
  gameStateId?: string;
};

export type UserReadyPayload = {
  playerId: string;
  lobbyId: string;
};

export type PingPayload = {};

export enum CardType {
  Regular,
  Twisted,
  BlackHole,
}

export enum SpecialEffect {
  SneakAPeak,
  SwapHand,
  SwitchLight,
}

export enum GameStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Ended = 'ended',
}

export enum Lights {
  RED = 'red',
  BLUE = 'blue',
}

export type Card = {
  id: string;
  description?: string;
  type: CardType;
  value: number;
  graphic: string;
  specialEffect?: SpecialEffect;
}

export type Hand = {
  cards: Card[];
}

export type Player = {
  hand: Hand;
  isReady: boolean;
  id: string;
  username: string;
}

export type Lobby = {
  id: string;
  users: Player[];
  messages: Message[];
  deck?: Deck;
  host: Player;
}

export type GameState = {
  id: string;
  table: Table;
  currentPlayerIndex: number;
  gameStatus: GameStatus;
  light: Lights;
  lobby: Lobby;
}

export type Deck = {
  id: string;
  cards: Card[];
}

export type Table = {
  id: string;
  disposedCards: Card[];
}

export type Message = {
  id: string;
  player: Player;
  content: string;
}

export type ClientEvents = {
  UserConnect: (payload: UserConnectPayload) => void;
  CreateLobby: (payload: CreateLobbyPayload) => void;
  JoinLobby: (payload: JoinLobbyPayload) => void;
  LeaveLobby: (payload: LeaveLobbyPayload) => void;
  SendMessage: (payload: SendMessagePayload) => void;
  UserReady: (payload: UserReadyPayload) => void;
  PickedCard: (payload: PickedCardPayload) => void;
  PlayedCard: (payload: PlayedCardPayload) => void;
  ChangeTurn: (payload: ChangeTurnPayload) => void;
  StartGame: (payload: StartGamePayload) => void;
  CardDiscarded: (payload: CardDiscardedPayload) => void;
  GameOver: (payload: GameOverPayload) => void;
  UserDisconnect: (payload: UserDisconnectPayload) => void;
  MatchCards: (payload: MatchCardsPayload) => void;
  RetrieveGameState: (payload: RetrieveGameStatePayload) => void;
  SaveGameState: (payload: SaveGameStatePayload) => void;
  Ping: () => void;
};

export type ServerEvents = {
  UserConnected: (user: Player) => void;
  LobbyCreated: (lobby: Lobby) => void;
  UserJoinedLobby: (lobby: Lobby) => void;
  UserLeftLobby: (lobby: Lobby) => void;
  MessageSent: (lobby: Lobby) => void;
  UserReady: (lobby: Lobby) => void;
  PickedCard: (gameState: GameState) => void;
  PlayedCard: (gameState: GameState) => void;
  ChangeTurn: (gameState: GameState) => void;
  GameStarted: (gameState: GameState) => void;
  DiscardedCard: (lobbyId: string, tableId: string, cardId: string) => void;
  GameEnded: (winner: Player) => void;
  UserDisconnected: (user: Player) => void;
  CardsMatched: (gameState: GameState) => void;
  GameStateRetrieved: (payload: {
    gameState: GameState;
    player: Player;
  }) => void;
  GameStateSaved: () => void;
  Pong: () => void;
  error: (payload: any) => void;
};

export enum LobbySteps {
  MainMenu,
  Login,
  GameModes,
  JoinLobby,
  Lobby,
  Game
}