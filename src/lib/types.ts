export type CardDiscardedPayload = {
  gameStateId: string;
  cardId: string;
  lobbyId: string;
  userId: string;
};

export type ChangeTurnPayload = {
  gameStateId: string;
  lobbyId: string;
};

export type CreateLobbyPayload = {};

export type GameOverPayload = {
  lobbyId: string,
  gameStateId: string,
};

export type JoinLobbyPayload = {
  lobbyId: string;
};

export type LeaveLobbyPayload = {
  lobbyId: string;
};

export type MatchCardsPayload = {
  userId: string;
  card1Id: string;
  card2Id: string;
  gameStateId: string;
  lobbyId: string;
};

export type PickedCardPayload = {
  userPreviousId: string;
  userNewId: string;
  cardId: string;
  gameStateId: string;
  lobbyId: string;
};

export type PlayedCardPayload = {
  userId: string;
  targetUserId?: string;
  cardId: string;
  tableId: string;
  lobbyId: string;
  gameStateId: string;
};

export type SendMessagePayload = {
  userId: string;
  lobbyId: string;
  message: string;
};

export type StartGamePayload = {
  lobbyId: string,
};

export type UserConnectPayload = {
  username: string;
};

export type UserDisconnectPayload = {
  userId: string;
  lobbyId?: string;
  gameStateId?: string;
};

export type UserReadyPayload = {
  userId: string;
  lobbyId: string;
};

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
  CreateLobby: () => void;
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
  GameEnded: () => void;
  UserDisconnected: (user: Player) => void;
  CardsMatched: (gameState: GameState) => void;
};

export enum LobbySteps {
  MainMenu,
  Login,
  GameModes,
  JoinLobby,
  Lobby,
  Game
}