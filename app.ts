import express from "express";
import { routes } from "./routes";
import { DataSource } from "typeorm";

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
      const connection = new DataSource({
        type: "mysql",
        host: "test-db.ctkggycairx6.us-west-2.rds.amazonaws.com",
        port: 3306,
        username: "fsadmin",
        password: "password2024",
        database: "fundacao_solidaria",
        synchronize: true,
        logging: false,
        entities: ["src/entity/**/*.ts"],
      });

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
