"use client";

import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Markets = () => {
  const [tickers, setTickers] = useState<Ticker[]>();

  useEffect(() => {
    getTickers().then((m) => setTickers(m));
  }, []);

  return (
    <div className="flex w-full max-w-[1280px] flex-1 flex-col">
      <div className="flex w-full min-w-[700px] flex-1 flex-col">
        <div className="flex w-full flex-col rounded-lg bg-baseBackgroundL1 px-5 py-3">
          <table className="w-full table-auto">
            <MarketHeader />
            {tickers?.map((m, index) => <MarketRow market={m} key={index} />)}
          </table>
        </div>
      </div>
    </div>
  );
};

function MarketRow({ market }: { market: Ticker }) {
  const router = useRouter();
  return (
    <tr
      className="hover:bg-white/7 w-full cursor-pointer border-t border-baseBorderLight"
      onClick={() => router.push(`/trade/${market.symbol}`)}
    >
      <td className="px-1 py-3">
        <div className="flex shrink">
          <div className="undefined flex items-center">
            <div
              className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
              style={{ width: "40px", height: "40px" }}
            >
              <div className="relative">
                <Image
                  alt={market.symbol}
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
                  }
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  data-nimg="1"
                  className=""
                />
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <p className="text-base text-baseTextHighEmphasis whitespace-nowrap font-medium">
                {market.symbol}
              </p>
              <div className="flex flex-row items-center justify-start gap-2">
                <p className="flex-medium text-baseTextMedEmphasis text-left text-xs leading-5">
                  {market.symbol}
                </p>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.lastPrice}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.high}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.volume}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base text-greenText font-medium tabular-nums">
          {Number(market.priceChangePercent)?.toFixed(3)} %
        </p>
      </td>
    </tr>
  );
}

function MarketHeader() {
  return (
    <thead>
      <tr className="">
        <th className="text-baseTextMedEmphasis px-2 py-3 text-left text-sm font-normal">
          <div className="flex cursor-pointer select-none items-center gap-1">
            Name<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="text-baseTextMedEmphasis px-2 py-3 text-left text-sm font-normal">
          <div className="flex cursor-pointer select-none items-center gap-1">
            Price<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="text-baseTextMedEmphasis px-2 py-3 text-left text-sm font-normal">
          <div className="flex cursor-pointer select-none items-center gap-1">
            Market Cap<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="text-baseTextMedEmphasis px-2 py-3 text-left text-sm font-normal">
          <div className="flex cursor-pointer select-none items-center gap-1">
            24h Volume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-down h-4 w-4"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </th>
        <th className="text-baseTextMedEmphasis px-2 py-3 text-left text-sm font-normal">
          <div className="flex cursor-pointer select-none items-center gap-1">
            24h Change<span className="w-[16px]"></span>
          </div>
        </th>
      </tr>
    </thead>
  );
}
