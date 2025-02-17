"use client";
import { useEffect, useState } from "react";
import { type Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { SignalingManager } from "../utils/SignalingManager";
import Image from "next/image";

export const MarketBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);
    SignalingManager.getInstance().registerCallback(
      "ticker",
      (data: Partial<Ticker>) =>
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        })),
      `TICKER-${market}`,
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`,
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);
  //

  return (
    <div>
      <div className="relative flex w-full flex-row items-center overflow-hidden border-b border-slate-800">
        <div className="no-scrollbar flex flex-row items-center justify-between overflow-auto pr-4">
          <Ticker market={market} />
          <div className="flex flex-row items-center space-x-8 pl-4">
            <div className="flex h-full flex-col justify-center">
              <p
                className={`text-greenText text-md font-medium tabular-nums text-green-500`}
              >
                ${ticker?.lastPrice}
              </p>
              <p className="text-sm font-medium tabular-nums">
                ${ticker?.lastPrice}
              </p>
            </div>
            <div className="flex flex-col">
              <p className={`text-sm font-medium text-slate-400`}>24H Change</p>
              <p
                className={`text-greenText text-sm font-medium tabular-nums leading-5 ${
                  Number(ticker?.priceChange) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Number(ticker?.priceChange) > 0 ? "+" : ""}{" "}
                {ticker?.priceChange}{" "}
                {Number(ticker?.priceChangePercent)?.toFixed(2)}%
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-400">24H High</p>
              <p className="text-sm font-medium tabular-nums leading-5">
                {ticker?.high}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-400">24H Low</p>
              <p className="text-sm font-medium tabular-nums leading-5">
                {ticker?.low}
              </p>
            </div>
            <button
              type="button"
              className="text-base text-left font-medium transition-opacity hover:cursor-pointer hover:opacity-80"
              data-rac=""
            >
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-400">24H Volume</p>
                <p className="mt-1 text-sm font-medium tabular-nums leading-5">
                  {ticker?.volume}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Ticker({ market }: { market: string }) {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
      <div className="relative -mr-4 ml-2 flex flex-row">
        <Image
          width={24}
          height={24}
          alt="SOL Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="z-10 mt-4 h-6 w-6 rounded-full outline-baseBackgroundL1"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
        <Image
          width={24}
          height={24}
          alt="USDC Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="-ml-2 mt-4 h-6 w-6 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex cursor-pointer flex-row items-center justify-between rounded-lg p-3 hover:opacity-80">
          <div className="undefined flex flex-row items-center gap-2">
            <div className="relative flex flex-row">
              <p className="undefined text-sm font-medium">
                {market.replace("_", " / ")}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
