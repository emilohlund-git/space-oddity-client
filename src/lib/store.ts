import { writable } from 'svelte/store';
import { LobbySteps, type GameState, type Lobby, type Message, type Player } from './types';

export const player = writable({} as Player);
export const lobby = writable({} as Lobby);
export const gameState = writable({} as GameState);
export const messages = writable([] as Message[]);
export const disconnected = writable(false);
export const currentStep = writable(LobbySteps.MainMenu);
export const showOpponentsHand = writable(false);
export const winner = writable({} as Player);
export const chooseOpponentHand = writable(false);
export const playedCardId = writable(undefined as string | undefined);