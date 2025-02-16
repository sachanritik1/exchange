"use client";

import { getTrades } from "@/app/utils/httpClient";
import { type Trade } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import { SignalingManager } from "../utils/SignalingManager";

const Trades = ({ market }: { market: string }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "trade",
      (trade: Trade) => {
        console.log(trade);
        setTrades((prevTrades) => {
          return [trade, ...prevTrades];
        });
      },
      `TRADE-${market}`
    );

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade@${market}`],
    });

    getTrades(market)
      .then((_trades) => {
        setTrades(_trades);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade@${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "trade",
        `TRADE-${market}`
      );
    };
  }, [market]);

  return (
    <div>
      <div className="grid grid-cols-3 text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Time</div>
      </div>
      {trades?.map((trade) => (
        <div
          key={Math.random()}
          className="grid grid-cols-3 overflow-y-auto text-xs"
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
