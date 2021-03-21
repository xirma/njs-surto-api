import { join } from 'path';
import cors from 'cors';
import express from 'express';
import { ConsoleColor } from './core/console';
import Logger from './core/logger';
import routes from './routes';
import RequestLoggerMiddleware from './core/http/request-logger.middleware';
import TokenMiddleware from './security/token.middleware';
import fileUpload from 'express-fileupload';

export default class App {

    public static run(port: number): void {
        const app = new App().express;
        app.listen(port, () => Logger.log(`---> App started at port ${port}`, ConsoleColor.FgGreen));
    }

    public express: express.Application;

    constructor() {
        this.express = express();
        this.setupExpress();
        this.setupLogger();
        this.routes();
    }

    private setupExpress(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({
            extended: true
        }));   
        this.express.use(fileUpload ({
            createParentPath: true
        }));        
    }

    private setupLogger(): void {
        this.express.use(RequestLoggerMiddleware.logRequest);
    }

    private routes(): void {
        this.express.use(express.static(join(__dirname, '..', 'public')));
        this.express.use(TokenMiddleware.tokenVerify);
        this.express.use(routes);
    }
}