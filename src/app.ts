import express from 'express'
import { ConsoleColor } from './core/console';
import Logger from './core/logger';

export default class App {

    public static run(port: number): void {
        const app = new App().express;
        app.listen(port, () => Logger.log(`---> App started at port ${port}`, ConsoleColor.FgGreen));
    }

    public express: express.Application;

    constructor() {
        this.express = express();
    }
}