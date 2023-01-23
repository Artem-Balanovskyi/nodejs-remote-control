import { httpServer } from "./http_server/index";
import { WebSocketServer, createWebSocketStream } from "ws";
import { makeMsgColoured } from "./utils/makeMsgColoured";
import { allCommands } from "./comands/allComands";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

makeMsgColoured(34, `Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

makeMsgColoured(34, `Start websocket server on the ${wss.options.port} port!`);

wss.on('connection', (ws, req) => {
    makeMsgColoured(34, `New connection from address: ${req.socket.remoteAddress}, port: ${req.socket.remotePort}`)

    const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });

    duplex.on('data', async (message) => {
        makeMsgColoured(33, `received: ${message}`);

        message = message.split(' ');
        const command = message[0];
        const args: number[] = message.splice(1)

        if (command in allCommands) {
            try {
                const result = await allCommands[command](args);
                makeMsgColoured(32, `success: ${result}`);
                duplex.write(result);
            } catch (err: any) {
                makeMsgColoured(31, `Operation "${command}" failed, error: "${err.message}"`);
            }
        }
    });

    ws.on('close', () => {
        makeMsgColoured(34, 'Connection closed');
    });

    
    process.on('SIGINT', () => {
        makeMsgColoured(34, 'Closing websocket server...');
        ws.close();
        makeMsgColoured(34, 'Connection closed');
        wss.close();
        makeMsgColoured(34, 'Websocket server stopped');
        process.exit(0);
    });
});

wss.on('close', () => {
    makeMsgColoured(34, 'Websocket server stopped');
});