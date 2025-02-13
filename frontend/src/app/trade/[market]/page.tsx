"use client";

import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import Trades from "@/app/components/depth/Trades";
import { useParams } from "next/navigation";
import { useState } from "react";

const BookAndTradesTabs = [
  { label: "Depth", component: Depth },
  { label: "Trades", component: Trades },
];

export default function Page() {
  const { market } = useParams();

  const [showDepthORTrades, setShowDepthORTrades] = useState(
    BookAndTradesTabs[0]?.label,
  );

  const ActiveComponent = BookAndTradesTabs.find(
    (item) => item.label === showDepthORTrades,
  )?.component;

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex flex-1 flex-col">
        <MarketBar market={market as string} />
        <div className="flex h-[620px] flex-row border-y border-slate-800">
          <div className="flex flex-1 flex-col">
            <TradeView market={market as string} />
          </div>
          <div className="w-[1px] flex-col border-l border-slate-800"></div>
          <div className="flex w-[250px] flex-col overflow-hidden">
            <div className="grid grid-cols-2 gap-1">
              {BookAndTradesTabs.map((item) => (
                <button
                  key={item.label}
                  className="flex"
                  onClick={() => setShowDepthORTrades(item.label)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {ActiveComponent && <ActiveComponent market={market as string} />}
          </div>
        </div>
      </div>
      <div className="w-[1px] flex-col border-l border-slate-800"></div>
      <div>
        <div className="flex w-[250px] flex-col">
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
}
