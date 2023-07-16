import { PUBLIC_API_KEY, PUBLIC_SERVER_URL } from '$env/static/public';
import ioClient, { Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "./types";

const ENDPOINT = PUBLIC_SERVER_URL;

const io = ioClient(ENDPOINT, {
  extraHeaders: {
    'x-api-key': PUBLIC_API_KEY
  },
  autoConnect: true
})

export const socket = io as Socket<ServerEvents, ClientEvents>