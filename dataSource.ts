import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  host: "test-db.ctkggycairx6.us-west-2.rds.amazonaws.com",
  port: 3306,
  username: "fsadmin",
  password: "password2024",
  database: "fundacao_solidaria",
  synchronize: true,
  logging: false,
  entities: ["src/domain/**/*.model.ts"],
});

export default dataSource;
