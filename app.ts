import express from "express";
import "reflect-metadata";
import { routes } from "./routes";
import dataSource from "./dataSource";

class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private async database() {
    try {
      const connection = dataSource;

      await connection.initialize();
      console.log("Connected to database successfully!");
    } catch (error) {
      console.log("Cannot conect database: ", error);
    }
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
