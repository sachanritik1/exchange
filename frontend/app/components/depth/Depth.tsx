"use client";

import { useEffect, useState } from "react";
import { getDepth, getTicker, getTrades } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: { bids: [string, string][]; asks: [string, string][] }) => {
        console.log("depth has been updated");
        console.log(data);

        setBids((prev) => {
          const bidsNotPresentInPrev = data.bids.filter(
            ([price, _]) => !prev.some(([prevPrice, _]) => prevPrice === price)
          );
          const updatedBids = prev
            .map(([prevPrice, prevQuantity]) => {
              const updatedQuantity = data.bids.find(
                ([price, _]) => price === prevPrice
              )?.[1];
              return [prevPrice, updatedQuantity ?? prevQuantity];
            })
            .filter(([, quantity]) => quantity !== "0.00");
          return [...updatedBids, ...bidsNotPresentInPrev].sort(
            (a, b) => Number(b[0]) - Number(a[0])
          ) as [string, string][];
        });

        setAsks((prev) => {
          const asksNotPresentInPrev = data.asks.filter(
            ([price, _]) => !prev.some(([prevPrice, _]) => prevPrice === price)
          );
          const updatedAsks = prev
            .map(([prevPrice, prevQuantity]) => {
              const updatedQuantity = data.asks.find(
                ([price, _]) => price === prevPrice
              )?.[1];
              return [prevPrice, updatedQuantity ?? prevQuantity];
            })
            .filter(([, quantity]) => quantity !== "0.00");
          return [...updatedAsks, ...asksNotPresentInPrev].sort(
            (a, b) => Number(b[0]) - Number(a[0])
          ) as [string, string][];
        });
      },
      `DEPTH-${market}`
    );

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth@${market}`],
    });

    getDepth(market).then((d) => {
      setBids(d.bids.sort((a, b) => Number(b[0]) - Number(a[0])));
      setAsks(d.asks.sort((a, b) => Number(b[0]) - Number(a[0])));
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    getTrades(market).then((t) => setPrice(t[0].price));

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth@${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
    };
  }, [market]);

  return (
    <div>
      <TableHeader />
      {asks && <AskTable asks={asks} />}
      {price && <div>{price}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}
