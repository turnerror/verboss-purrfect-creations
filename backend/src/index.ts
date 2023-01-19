import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import { createOrder, getData } from './api';

dotenv.config();

const app: Express = express();
const port = 3001

app.get('/dashboard-stats', async (req: Request, res: Response) => {
  console.log("request received");
  const data = await getData();
  console.log("response sent", {data});
  res.send(data);
});

app.post('/order', async (req: Request, res: Response) => {
  console.log("request received");
  const data = await createOrder();
  console.log("response sent", {data});
  res.send(data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});