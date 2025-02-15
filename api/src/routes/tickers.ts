import { Router } from "express";

export const tickersRouter = Router();

tickersRouter.get("/", async (req, res) => {
  return res.json([{ symbol: "TATA_INR" }]);
});
