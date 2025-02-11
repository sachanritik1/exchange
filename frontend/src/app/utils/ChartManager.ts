import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime = 0;
  private chart: unknown;
  private currentBar: {
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
  } = {
    open: null,
    high: null,
    low: null,
    close: null,
  };

  constructor(
    ref: HTMLElement,
    initialData: unknown[],
    layout: { background: string; color: string },
  ) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white",
      },
    });
    this.chart = chart;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.candleSeries = chart.addCandlestickSeries();

    this.candleSeries.setData(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
      initialData.map((data) => ({
        ...data,
        time: (data.timestamp / 1000) as UTCTimestamp,
      })),
    );
  }
  public update(updatedPrice: unknown) {
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = new Date().getTime();
    }

    this.candleSeries.update({
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      close: updatedPrice.close,
      low: updatedPrice.low,
      high: updatedPrice.high,
      open: updatedPrice.open,
    });

    if (updatedPrice.newCandleInitiated) {
      this.lastUpdateTime = updatedPrice.time;
    }
  }
  public destroy() {
    this.chart.remove();
  }
}
