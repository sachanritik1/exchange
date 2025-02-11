"use client";

import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";

export default function Page() {
  const { market } = useParams();

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
            <Depth market={market as string} />
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
