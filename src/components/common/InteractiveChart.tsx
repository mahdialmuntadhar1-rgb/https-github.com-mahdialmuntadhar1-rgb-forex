import React, { useState, useEffect, useRef } from 'react';
import { marketApi } from '../../services/marketApi';
import { BarChart3, LineChart, Layers, Eye, RefreshCw } from 'lucide-react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface InteractiveChartProps {
  symbol: string;
  initialTimeframe?: string;
  height?: number;
  showIndicators?: boolean;
  supportLevel?: number;
  resistanceLevel?: number;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  symbol,
  initialTimeframe = '1H',
  height = 420,
  showIndicators = true,
  supportLevel,
  resistanceLevel
}) => {
  const [timeframe, setTimeframe] = useState<string>(initialTimeframe);
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [showEma, setShowEma] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(700);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const loadChartData = async () => {
    setLoading(true);
    try {
      const data = await marketApi.getHistoricalCandles(symbol, timeframe);
      setCandles(data);
    } catch (err) {
      console.error('Failed to load chart data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChartData();
  }, [symbol, timeframe]);

  // Subscribe to live tick updates to synchronize the latest candle close
  useEffect(() => {
    const unsubscribe = marketApi.subscribeToTicks(quotes => {
      const cleanId = symbol.replace('/', '-').toUpperCase();
      const currentQuote = quotes[cleanId];
      if (currentQuote) {
        setCandles(prev => {
          if (prev.length === 0) return prev;
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.close = currentQuote.price;
          last.high = Math.max(last.high, currentQuote.price);
          last.low = Math.min(last.low, currentQuote.price);
          updated[updated.length - 1] = last;
          return updated;
        });
      }
    });

    return () => unsubscribe();
  }, [symbol]);

  // Chart Mathematical Calculations
  const isGold = symbol.includes('XAU') || symbol.includes('Gold');
  const digits = isGold ? 2 : 5;
  const paddingRight = 65;
  const paddingLeft = 10;
  const paddingTop = 20;
  const paddingBottom = 45;
  const chartHeight = height - paddingTop - paddingBottom;
  const volumeHeight = chartHeight * 0.22;
  const priceChartHeight = chartHeight - volumeHeight - 15;
  const usableWidth = Math.max(100, containerWidth - paddingLeft - paddingRight);

  const minPrice = candles.length > 0 ? Math.min(...candles.map(c => c.low)) : 0;
  const maxPrice = candles.length > 0 ? Math.max(...candles.map(c => c.high)) : 1;
  const priceRange = maxPrice - minPrice === 0 ? 0.0001 : maxPrice - minPrice;
  const maxVolume = candles.length > 0 ? Math.max(...candles.map(c => c.volume)) : 1;

  const getYForPrice = (p: number) => {
    return paddingTop + (1 - (p - minPrice) / priceRange) * priceChartHeight;
  };

  const getYForVolume = (v: number) => {
    const volRatio = v / maxVolume;
    return paddingTop + priceChartHeight + 15 + (1 - volRatio) * volumeHeight;
  };

  const candleWidth = candles.length > 0 ? Math.max(2, (usableWidth / candles.length) * 0.75) : 8;
  const getXForIndex = (i: number) => {
    return paddingLeft + (i / Math.max(1, candles.length - 1)) * usableWidth;
  };

  // EMA calculations
  const calculateEMA = (period: number) => {
    if (candles.length < period) return [];
    const k = 2 / (period + 1);
    const emaValues: { x: number; y: number }[] = [];
    let prevEma = candles[0].close;

    candles.forEach((c, i) => {
      const ema = c.close * k + prevEma * (1 - k);
      prevEma = ema;
      if (i >= 5) {
        emaValues.push({
          x: getXForIndex(i),
          y: getYForPrice(ema)
        });
      }
    });
    return emaValues;
  };

  const ema50Points = calculateEMA(14);
  const ema200Points = calculateEMA(28);

  const activeCandle = hoveredCandle || (candles.length > 0 ? candles[candles.length - 1] : null);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl bg-slate-900/90 border border-slate-800 p-4 relative select-none shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Top Chart Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-slate-100 tracking-wide">
            {symbol}
          </span>
          {activeCandle && (
            <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <span>O: <strong className="text-slate-200">{activeCandle.open.toFixed(digits)}</strong></span>
              <span>H: <strong className="text-emerald-400">{activeCandle.high.toFixed(digits)}</strong></span>
              <span>L: <strong className="text-rose-400">{activeCandle.low.toFixed(digits)}</strong></span>
              <span>C: <strong className={activeCandle.close >= activeCandle.open ? 'text-emerald-400' : 'text-rose-400'}>{activeCandle.close.toFixed(digits)}</strong></span>
              <span>Vol: <strong className="text-slate-200">{activeCandle.volume.toLocaleString()}</strong></span>
            </div>
          )}
        </div>

        {/* Timeframe & Chart Style Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800">
            {['15M', '1H', '4H', '1D', '1W'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setChartType('candle')}
              title="Candlestick View"
              className={`p-1.5 rounded-md transition-all ${
                chartType === 'candle' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 size={15} />
            </button>
            <button
              onClick={() => setChartType('line')}
              title="Line View"
              className={`p-1.5 rounded-md transition-all ${
                chartType === 'line' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LineChart size={15} />
            </button>
          </div>

          {showIndicators && (
            <div className="hidden md:flex items-center gap-1.5 bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 text-xs text-slate-400">
              <button
                onClick={() => setShowEma(!showEma)}
                className={`flex items-center gap-1 font-mono px-1.5 py-0.5 rounded transition ${
                  showEma ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'opacity-50'
                }`}
              >
                <Layers size={12} /> EMA (50/200)
              </button>
              {(supportLevel || resistanceLevel) && (
                <button
                  onClick={() => setShowZones(!showZones)}
                  className={`flex items-center gap-1 font-mono px-1.5 py-0.5 rounded transition ${
                    showZones ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'opacity-50'
                  }`}
                >
                  <Eye size={12} /> Key S/R
                </button>
              )}
            </div>
          )}

          <button
            onClick={loadChartData}
            title="Refresh Chart"
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-950/70 border border-slate-800 rounded-lg hover:bg-slate-800/60 transition"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full" style={{ height: height - 60 }}>
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <RefreshCw size={16} className="animate-spin" /> Loading terminal feeds...
            </div>
          </div>
        )}

        <svg
          width={containerWidth}
          height={height - 60}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredCandle(null)}
        >
          <defs>
            <linearGradient id="lineChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Price Ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = paddingTop + pct * priceChartHeight;
            const priceLabel = (maxPrice - pct * priceRange).toFixed(digits);
            return (
              <g key={i} className="text-slate-600 font-mono text-[10px]">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={containerWidth - paddingRight}
                  y2={y}
                  stroke="#1E293B"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={containerWidth - paddingRight + 8}
                  y={y + 3}
                  fill="#64748B"
                  textAnchor="start"
                >
                  {priceLabel}
                </text>
              </g>
            );
          })}

          {/* Support & Resistance Horizontal Zones */}
          {showZones && supportLevel && (
            <g>
              <line
                x1={paddingLeft}
                y1={getYForPrice(supportLevel)}
                x2={containerWidth - paddingRight}
                y2={getYForPrice(supportLevel)}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                strokeOpacity="0.8"
              />
              <rect
                x={containerWidth - paddingRight + 4}
                y={getYForPrice(supportLevel) - 8}
                width="56"
                height="16"
                fill="#064E3B"
                rx="3"
              />
              <text
                x={containerWidth - paddingRight + 8}
                y={getYForPrice(supportLevel) + 3}
                fill="#34D399"
                fontSize="10"
                fontFamily="monospace"
              >
                SUP {supportLevel.toFixed(digits)}
              </text>
            </g>
          )}

          {showZones && resistanceLevel && (
            <g>
              <line
                x1={paddingLeft}
                y1={getYForPrice(resistanceLevel)}
                x2={containerWidth - paddingRight}
                y2={getYForPrice(resistanceLevel)}
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                strokeOpacity="0.8"
              />
              <rect
                x={containerWidth - paddingRight + 4}
                y={getYForPrice(resistanceLevel) - 8}
                width="56"
                height="16"
                fill="#7F1D1D"
                rx="3"
              />
              <text
                x={containerWidth - paddingRight + 8}
                y={getYForPrice(resistanceLevel) + 3}
                fill="#F87171"
                fontSize="10"
                fontFamily="monospace"
              >
                RES {resistanceLevel.toFixed(digits)}
              </text>
            </g>
          )}

          {/* Volume Sub-Chart Divider */}
          <line
            x1={paddingLeft}
            y1={paddingTop + priceChartHeight + 10}
            x2={containerWidth - paddingRight}
            y2={paddingTop + priceChartHeight + 10}
            stroke="#1E293B"
            strokeWidth="1"
          />

          {/* Volume Bars */}
          {candles.map((c, i) => {
            const x = getXForIndex(i);
            const yVol = getYForVolume(c.volume);
            const isBullish = c.close >= c.open;
            const barHeight = Math.max(2, paddingTop + chartHeight - yVol);

            return (
              <rect
                key={`vol-${i}`}
                x={x - candleWidth / 2}
                y={yVol}
                width={candleWidth}
                height={barHeight}
                fill={isBullish ? '#10B981' : '#EF4444'}
                opacity={0.35}
              />
            );
          })}

          {/* Line Chart Mode */}
          {chartType === 'line' && candles.length > 1 && (
            <g>
              <polygon
                points={`${getXForIndex(0)},${paddingTop + priceChartHeight} ${candles
                  .map((c, i) => `${getXForIndex(i)},${getYForPrice(c.close)}`)
                  .join(' ')} ${getXForIndex(candles.length - 1)},${paddingTop + priceChartHeight}`}
                fill="url(#lineChartGrad)"
              />
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={candles.map((c, i) => `${getXForIndex(i)},${getYForPrice(c.close)}`).join(' ')}
              />
            </g>
          )}

          {/* EMA Overlays */}
          {showEma && ema50Points.length > 1 && (
            <polyline
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              points={ema50Points.map(p => `${p.x},${p.y}`).join(' ')}
            />
          )}
          {showEma && ema200Points.length > 1 && (
            <polyline
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.5"
              strokeOpacity="0.75"
              points={ema200Points.map(p => `${p.x},${p.y}`).join(' ')}
            />
          )}

          {/* Candlesticks */}
          {chartType === 'candle' &&
            candles.map((c, i) => {
              const x = getXForIndex(i);
              const isBull = c.close >= c.open;
              const candleColor = isBull ? '#10B981' : '#EF4444';
              const yHigh = getYForPrice(c.high);
              const yLow = getYForPrice(c.low);
              const yOpen = getYForPrice(c.open);
              const yClose = getYForPrice(c.close);
              const bodyTop = Math.min(yOpen, yClose);
              const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

              return (
                <g
                  key={`candle-${i}`}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={() => setHoveredCandle(c)}
                >
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={candleColor}
                    strokeWidth="1.5"
                  />
                  {/* Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={bodyTop}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={candleColor}
                    rx="1"
                  />
                </g>
              );
            })}

          {/* Time Labels on X-Axis */}
          {candles.map((c, i) => {
            // Show every ~8th label
            if (i % 7 !== 0) return null;
            const x = getXForIndex(i);
            return (
              <text
                key={`time-${i}`}
                x={x}
                y={paddingTop + chartHeight + 18}
                fill="#64748B"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {c.time}
              </text>
            );
          })}

          {/* Hover Crosshair Guide */}
          {hoveredCandle && (
            <g>
              <line
                x1={getXForIndex(candles.indexOf(hoveredCandle))}
                y1={paddingTop}
                x2={getXForIndex(candles.indexOf(hoveredCandle))}
                y2={paddingTop + chartHeight}
                stroke="#60A5FA"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <line
                x1={paddingLeft}
                y1={getYForPrice(hoveredCandle.close)}
                x2={containerWidth - paddingRight}
                y2={getYForPrice(hoveredCandle.close)}
                stroke="#60A5FA"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Floating Price Pill */}
              <rect
                x={containerWidth - paddingRight + 4}
                y={getYForPrice(hoveredCandle.close) - 8}
                width="60"
                height="16"
                fill="#2563EB"
                rx="3"
              />
              <text
                x={containerWidth - paddingRight + 8}
                y={getYForPrice(hoveredCandle.close) + 3}
                fill="#FFFFFF"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {hoveredCandle.close.toFixed(digits)}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Indicator Legend Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-4">
          {showEma && (
            <>
              <span className="flex items-center gap-1.5 font-mono">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block"></span> EMA 50
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block"></span> EMA 200
              </span>
            </>
          )}
          <span className="flex items-center gap-1 font-mono">
            <span className="w-2 h-2 bg-emerald-500/40 inline-block rounded-xs"></span> Vol Flow
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          UTC Standard Time • Dynamic Feed
        </div>
      </div>
    </div>
  );
};
