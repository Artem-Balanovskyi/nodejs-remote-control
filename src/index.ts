import { httpServer } from "./http_server/index";
import { WebSocketServer, createWebSocketStream } from "ws";
import { mouse } from "@nut-tree/nut-js";
import { makeMsgGreen, makeMsgBlue, makeMsgYellow } from "./utils/makeMsgColoured";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

makeMsgBlue(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

makeMsgYellow(`Start websocket server on the ${wss.options.port} port!`);

wss.on('connection', (ws, req) => {
    makeMsgGreen(`New connection from address: ${req.socket.remoteAddress}, port: ${req.socket.remotePort}`)

    const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });

    duplex.on('data', async (message) => {
		makeMsgYellow(`received: ${message}`);
	});

    ws.on('close', () => {
        makeMsgBlue('Connection closed');
    });

    wss.on('close', () => {
        makeMsgYellow('Server shutdown');
    });

    process.on('SIGINT', () => {
        process.stdout.write('Closing websocket server...\n');
        ws.close();
        wss.close();
        process.exit(0);
    });
});