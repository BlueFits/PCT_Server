import express from "express";

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

import { CommonRoutesConfig } from './common/common.routes.config';
import ToolsRoutes from "./tools/tools.routes.config";

const toolsRouter = new ToolsRoutes("ToolsRoutes").getRouter;

const app: express.Application = express();
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));
//Routes
app.use("/tools", toolsRouter);


const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
})