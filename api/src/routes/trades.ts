import { Router } from "express";
import { Client } from "pg";

export const tradesRouter = Router();

const pgClient = new Client({
  user: "your_user",
  host: "localhost",
  database: "my_database",
  password: "your_password",
  port: 5432,
});
pgClient.connect();

export interface Trade {
  id: number;
  isBuyerMaker: boolean;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
}

tradesRouter.get("/", async (req, res) => {
  const { market } = req.query;
  const query = "SELECT * FROM tata_prices order by time desc limit 10";
  const response = await pgClient.query(query);

  const trades: Trade[] = response.rows.map((row) => ({
    id: row?.id,
    isBuyerMaker: row?.is_buyer_maker,
    price: row?.price,
    quantity: row?.volume,
    quoteQuantity: row?.quote_quantity,
    timestamp: row?.time,
  }));

  res.json(trades);
});
