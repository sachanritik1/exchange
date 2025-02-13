"use client";

import { useEffect, useState } from "react";
import { getDepth, getTicker } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "@/app/utils/SignalingManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    SignalingManager.getInstance()
      .registerCallback(
        "depth",
        (data: { bids: [string, string][]; asks: [string, string][] }) => {
          console.log(data);
          setBids((prev) => {
            // find all the data.bids[i] that are not in prev then add them to prev if they are in prev, update the quantity
            const bidsNotPresentInPrev = data.bids.filter(
              ([price, _]) =>
                !prev.some(([prevPrice, _]) => prevPrice === price),
            );

            const updatedBids = prev
              .map(([prevPrice, prevQuantity]) => {
                const updatedQuantity = data.bids.find(
                  ([price, _]) => price === prevPrice,
                )?.[1];
                return [prevPrice, updatedQuantity ?? prevQuantity];
              })
              .filter(([, quantity]) => quantity !== "0.00");

            return [...updatedBids, ...bidsNotPresentInPrev].sort(
              (a, b) => Number(b[0]) - Number(a[0]),
            ) as [string, string][];
          });

          setAsks((prev) => {
            const asksNotPresentInPrev = data.asks.filter(
              ([price, _]) =>
                !prev.some(([prevPrice, _]) => prevPrice === price),
            );

            const updatedAsks = prev
              .map(([prevPrice, prevQuantity]) => {
                const updatedQuantity = data.asks.find(
                  ([price, _]) => price === prevPrice,
                )?.[1];
                return [prevPrice, updatedQuantity ?? prevQuantity];
              })
              .filter(([, quantity]) => quantity !== "0.00");

            return [...updatedAsks, ...asksNotPresentInPrev].sort(
              (a, b) => Number(a[0]) - Number(b[0]),
            ) as [string, string][];
          });
        },
        `DEPTH-${market}`,
      )
      .catch((error) => {
        console.error("Failed to register depth callback:", error);
      });

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.200ms.${market}`],
    });

    getDepth(market)
      .then((d) => {
        setBids(d.bids.reverse());
        setAsks(d.asks);
      })
      .catch((error) => {
        console.error("Failed to fetch depth data:", error);
      });

    getTicker(market)
      .then((t) => setPrice(t.lastPrice))
      .catch((error) => {
        console.error("Failed to fetch ticker data:", error);
      });

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });

      SignalingManager.getInstance()
        .deRegisterCallback("depth", `DEPTH-${market}`)
        .catch((error) => {
          console.error("Failed to deregister depth callback:", error);
        });
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
