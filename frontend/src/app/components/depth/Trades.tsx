"use client";

import { getTrades } from "@/app/utils/httpClient";
import { type Trade } from "@/app/utils/types";
import React, { useEffect, useState } from "react";

const Trades = ({ market }: { market: string }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    getTrades(market)
      .then((_trades) => {
        setTrades(_trades);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [market]);

  return (
    <div>
      <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Time</div>
      </div>
      {trades.map((trade) => (
        <div
          key={trade.id}
          className="flex justify-between overflow-y-auto text-xs"
        >
          <div className="text-slate-500">{trade.price}</div>
          <div className="text-slate-500">{trade.quantity}</div>
          <div className="text-slate-500">
            {new Date(trade.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trades;
