"use client";
import { useState } from "react";

export function SwapUI({ market }: { market: string }) {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [type, setType] = useState("limit");

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex h-[60px] flex-row">
          <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
          <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-3">
            <div className="flex-0 undefined flex flex-row gap-5">
              <LimitButton type={type} setType={setType} />
              <MarketButton type={type} setType={setType} />
            </div>
          </div>
          <div className="flex flex-col px-3">
            <div className="text-baseTextHighEmphasis flex flex-1 flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-baseTextMedEmphasis text-xs font-normal">
                    Available Balance
                  </p>
                  <p className="text-baseTextHighEmphasis text-xs font-medium">
                    36.94 USDC
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-baseTextMedEmphasis text-xs font-normal">
                  Price
                </p>
                <div className="relative flex flex-col">
                  <input
                    step="0.01"
                    placeholder="0"
                    className="border-baseBorderLight placeholder-baseTextMedEmphasis focus:border-accentBlue h-12 rounded-lg border-2 border-solid bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] ring-0 transition focus:ring-0"
                    type="text"
                    value="134.38"
                    readOnly
                  />
                  <div className="absolute right-1 top-1 flex flex-row p-2">
                    <div className="relative">
                      <img src="/usdc.webp" className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-baseTextMedEmphasis text-xs font-normal">
                Quantity
              </p>
              <div className="relative flex flex-col">
                <input
                  step="0.01"
                  placeholder="0"
                  className="border-baseBorderLight placeholder-baseTextMedEmphasis focus:border-accentBlue h-12 rounded-lg border-2 border-solid bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] ring-0 transition focus:ring-0"
                  type="text"
                  value="123"
                  readOnly
                />
                <div className="absolute right-1 top-1 flex flex-row p-2">
                  <div className="relative">
                    <img src="/sol.webp" className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <p className="text-baseTextMedEmphasis pr-2 text-xs font-medium">
                  ≈ 0.00 USDC
                </p>
              </div>
              <div className="mt-2 flex flex-row justify-center gap-3">
                <div className="bg-baseBackgroundL2 hover:bg-baseBackgroundL3 flex cursor-pointer flex-row items-center justify-center rounded-full px-[16px] py-[6px] text-xs">
                  25%
                </div>
                <div className="bg-baseBackgroundL2 hover:bg-baseBackgroundL3 flex cursor-pointer flex-row items-center justify-center rounded-full px-[16px] py-[6px] text-xs">
                  50%
                </div>
                <div className="bg-baseBackgroundL2 hover:bg-baseBackgroundL3 flex cursor-pointer flex-row items-center justify-center rounded-full px-[16px] py-[6px] text-xs">
                  75%
                </div>
                <div className="bg-baseBackgroundL2 hover:bg-baseBackgroundL3 flex cursor-pointer flex-row items-center justify-center rounded-full px-[16px] py-[6px] text-xs">
                  Max
                </div>
              </div>
            </div>
            <button
              type="button"
              className="focus:none bg-greenPrimaryButtonBackground text-greenPrimaryButtonText active:scale-98 my-4 h-12 rounded-xl px-4 py-2 text-center text-base font-semibold focus:outline-none focus:ring-blue-200"
              data-rac=""
            >
              Buy
            </button>
            <div className="mt-1 flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <div className="flex items-center">
                  <input
                    className="form-checkbox border-baseBorderMed bg-base-950 checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:checked:border-baseBorderMed h-5 w-5 cursor-pointer rounded border border-solid font-light text-transparent shadow-none shadow-transparent outline-none ring-0 ring-transparent focus:ring-0 focus:ring-offset-0"
                    id="postOnly"
                    type="checkbox"
                    data-rac=""
                  />
                  <label className="ml-2 text-xs">Post Only</label>
                </div>
                <div className="flex items-center">
                  <input
                    className="form-checkbox border-baseBorderMed bg-base-950 checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:checked:border-baseBorderMed h-5 w-5 cursor-pointer rounded border border-solid font-light text-transparent shadow-none shadow-transparent outline-none ring-0 ring-transparent focus:ring-0 focus:ring-offset-0"
                    id="ioc"
                    type="checkbox"
                    data-rac=""
                  />
                  <label className="ml-2 text-xs">IOC</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LimitButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex cursor-pointer flex-col justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`border-b-2 py-1 text-sm font-medium ${type === "limit" ? "border-accentBlue text-baseTextHighEmphasis" : "text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis border-transparent"}`}
      >
        Limit
      </div>
    </div>
  );
}

function MarketButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex cursor-pointer flex-col justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`border-b-2 py-1 text-sm font-medium ${type === "market" ? "border-accentBlue text-baseTextHighEmphasis" : "text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis border-b-2 border-transparent"} `}
      >
        Market
      </div>
    </div>
  );
}

function BuyButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <div
      className={`mb-[-2px] flex flex-1 cursor-pointer flex-col justify-center border-b-2 p-4 ${activeTab === "buy" ? "border-b-greenBorder bg-greenBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActiveTab("buy")}
    >
      <p className="text-greenText text-center text-sm font-semibold">Buy</p>
    </div>
  );
}

function SellButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <div
      className={`mb-[-2px] flex flex-1 cursor-pointer flex-col justify-center border-b-2 p-4 ${activeTab === "sell" ? "border-b-redBorder bg-redBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActiveTab("sell")}
    >
      <p className="text-redText text-center text-sm font-semibold">Sell</p>
    </div>
  );
}
