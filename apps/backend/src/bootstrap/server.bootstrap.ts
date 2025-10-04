import { Application } from "express";
import * as http from "http"

export class ServerBootstrap {
    constructor(private readonly app: Application) {}

    async initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);

            server.on("error", (error) => {
                console.error("Server error", error);
                reject(error);
            });

            server.on("listening", () => {
                console.log('server is listening for requests');
                resolve(server);
            });

            const PORT = process.env.PORT || 3000;

            server.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            })
        })
    }
}