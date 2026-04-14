import React from "react";

interface SvgProps {
  width?: number;
  height?: number;
  className?: string;
}

// ────────────────────────────────────────────────
//  Basic Gate SVGs (horizontal layout)
// ────────────────────────────────────────────────

function BufferSvg({ width = 42, height = 42, className }: SvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      <polygon points="12,8 88,50 12,92" fill="#999" stroke="#333" strokeWidth="6" strokeLinejoin="round" />
    </svg>
  );
}

function NotSvg({ width = 42, height = 42, className }: SvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      <polygon points="8,8 66,50 8,92" fill="#999" stroke="#333" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="76" cy="50" r="8" fill="#999" stroke="#333" strokeWidth="4" />
    </svg>
  );
}

function NorSvg({ width = 70, height = 70, className, inputs = 2 }: SvgProps & { inputs?: number }) {
  const bodyPath = "M 20,10 Q 65,8 82,50 Q 65,92 20,90 Q 32,50 20,10 Z";
  const spacing = 80 / (inputs + 1);
  const stubs = Array.from({ length: inputs }, (_, i) => 10 + spacing * (i + 1));

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      {stubs.map((y, i) => (
        <line key={i} x1="0" y1={y} x2="22" y2={y} stroke="#333" strokeWidth={inputs <= 4 ? 5 : 4} />
      ))}
      <path d={bodyPath} fill="#999" stroke="#333" strokeWidth="5" />
      <circle cx="89" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
    </svg>
  );
}

function NandSvg({ width = 70, height = 70, className }: SvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      <path d="M 12,10 L 50,10 A 40,40 0 0 1 50,90 L 12,90 Z" fill="#999" stroke="#333" strokeWidth="5" />
      <circle cx="95" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
    </svg>
  );
}

function ExorSvg({ width = 90, height = 90, className }: SvgProps) {
  const bodyPath = "M 25,10 Q 68,8 88,50 Q 68,92 25,90 Q 37,50 25,10 Z";
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      <path d="M 17,10 Q 29,50 17,90" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <path d={bodyPath} fill="#999" stroke="#333" strokeWidth="5" />
    </svg>
  );
}

function ExnorSvg({ width = 90, height = 90, className }: SvgProps) {
  const bodyPath = "M 22,10 Q 60,8 76,50 Q 60,92 22,90 Q 34,50 22,10 Z";
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
      <path d="M 14,10 Q 26,50 14,90" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <path d={bodyPath} fill="#999" stroke="#333" strokeWidth="5" />
      <circle cx="84" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
    </svg>
  );
}

// ────────────────────────────────────────────────
//  IC Package SVG (shared by DEMUX, MUX, flip-flops, encoder)
// ────────────────────────────────────────────────

interface PinLabel {
  text: string;
  overline?: boolean;
}

function IcSvg({
  width = 100,
  height = 100,
  className,
  topLabels,
  bottomLabels,
}: SvgProps & { topLabels: PinLabel[]; bottomLabels: PinLabel[] }) {
  const vb = 200;
  const m = 10;
  const pinH = 30;
  const bodyW = vb - 2 * m;
  const bodyH = vb - 2 * m;

  const tCols = topLabels.length;
  const bCols = bottomLabels.length;
  const tPinW = bodyW / tCols;
  const bPinW = bodyW / bCols;

  const maxCols = Math.max(tCols, bCols);
  const maxLen = Math.max(
    ...topLabels.map((l) => l.text.length),
    ...bottomLabels.map((l) => l.text.length)
  );
  const fontSize = Math.min(15, (bodyW / maxCols - 4) / (maxLen * 0.55));

  const chipTop = m + pinH + 8;
  const chipH = bodyH - 2 * pinH - 16;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vb} ${vb}`}
      className={className}
    >
      {/* Body */}
      <rect
        x={m} y={m} width={bodyW} height={bodyH}
        rx="6" ry="6" fill="#888" stroke="#333" strokeWidth="4"
      />

      {/* Inner chip rectangle */}
      <rect
        x={m + bodyW * 0.25} y={chipTop}
        width={bodyW * 0.55} height={chipH}
        rx="4" ry="4" fill="#666" stroke="#555" strokeWidth="3"
      />

      {/* Triangle notch */}
      <polygon
        points={`${m + bodyW * 0.27},${vb * 0.43} ${m + bodyW * 0.34},${vb * 0.5} ${m + bodyW * 0.27},${vb * 0.57}`}
        fill="#555" stroke="#444" strokeWidth="1.5"
      />

      {/* Top pin labels */}
      {topLabels.map((label, i) => {
        const x = m + i * tPinW;
        const cx = x + tPinW / 2;
        const cy = m + pinH / 2 + 2;
        return (
          <g key={`t${i}`}>
            <rect
              x={x + 1} y={m + 1} width={tPinW - 2} height={pinH}
              fill="#777" stroke="#666" strokeWidth="1.5" rx="2"
            />
            <text
              x={cx} y={cy}
              textAnchor="middle" dominantBaseline="central"
              fill="#222" fontSize={fontSize} fontFamily="sans-serif" fontWeight="bold"
            >
              {label.text}
            </text>
            {label.overline && (
              <line
                x1={cx - label.text.length * fontSize * 0.28}
                y1={cy - fontSize * 0.6}
                x2={cx + label.text.length * fontSize * 0.28}
                y2={cy - fontSize * 0.6}
                stroke="#222" strokeWidth="1.5"
              />
            )}
          </g>
        );
      })}

      {/* Bottom pin labels */}
      {bottomLabels.map((label, i) => {
        const x = m + i * bPinW;
        const cx = x + bPinW / 2;
        const cy = vb - m - pinH / 2;
        return (
          <g key={`b${i}`}>
            <rect
              x={x + 1} y={vb - m - pinH - 1} width={bPinW - 2} height={pinH}
              fill="#777" stroke="#666" strokeWidth="1.5" rx="2"
            />
            <text
              x={cx} y={cy}
              textAnchor="middle" dominantBaseline="central"
              fill="#222" fontSize={fontSize} fontFamily="sans-serif" fontWeight="bold"
            >
              {label.text}
            </text>
            {label.overline && (
              <line
                x1={cx - label.text.length * fontSize * 0.28}
                y1={cy - fontSize * 0.6}
                x2={cx + label.text.length * fontSize * 0.28}
                y2={cy - fontSize * 0.6}
                stroke="#222" strokeWidth="1.5"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ────────────────────────────────────────────────
//  IC pin label configurations
// ────────────────────────────────────────────────

const icConfigs: Record<string, { topLabels: PinLabel[]; bottomLabels: PinLabel[] }> = {
  DEMUXm2: {
    topLabels: [
      { text: "VCC" }, { text: "I0" }, { text: "I1" }, { text: "I2" },
    ],
    bottomLabels: [
      { text: "A0" }, { text: "A1" }, { text: "U" }, { text: "I3" }, { text: "GND" },
    ],
  },
  DEMUXm3: {
    topLabels: [
      { text: "VCC" }, { text: "I0" }, { text: "I1" }, { text: "I2" },
      { text: "I3" }, { text: "I4" }, { text: "I5" }, { text: "I6" },
    ],
    bottomLabels: [
      { text: "A0" }, { text: "A1" }, { text: "A2" }, { text: "U1" },
      { text: "U2" }, { text: "U3" }, { text: "I7" }, { text: "GND" },
    ],
  },
  MUXm1: {
    topLabels: [
      { text: "VCC" }, { text: "U0" }, { text: "U1" },
    ],
    bottomLabels: [
      { text: "A0" }, { text: "I" }, { text: "E" }, { text: "GND" },
    ],
  },
  MUXm2: {
    topLabels: [
      { text: "VCC" }, { text: "U0" }, { text: "U1" }, { text: "U2" }, { text: "U3" },
    ],
    bottomLabels: [
      { text: "A0" }, { text: "A1" }, { text: "I" }, { text: "E" }, { text: "GND" },
    ],
  },
  MUXm3: {
    topLabels: [
      { text: "VCC" }, { text: "U4" }, { text: "U5" }, { text: "U6" },
      { text: "U7" }, { text: "A0" }, { text: "A1" }, { text: "A2" },
    ],
    bottomLabels: [
      { text: "U3" }, { text: "U2" }, { text: "U1" }, { text: "U0" },
      { text: "I" }, { text: "I", overline: true }, { text: "E" }, { text: "GND" },
    ],
  },
  DFlipFlop: {
    topLabels: [
      { text: "VCC" }, { text: "S", overline: true }, { text: "Q" }, { text: "Q", overline: true },
    ],
    bottomLabels: [
      { text: "R", overline: true }, { text: "D" }, { text: "CP" }, { text: "GND" },
    ],
  },
  JKFlipFlop: {
    topLabels: [
      { text: "VCC" }, { text: "S", overline: true }, { text: "Q" }, { text: "Q", overline: true },
    ],
    bottomLabels: [
      { text: "R", overline: true }, { text: "CP" }, { text: "K" }, { text: "J" }, { text: "GND" },
    ],
  },
  encoder: {
    topLabels: [
      { text: "VCC" }, { text: "EI" }, { text: "GS" }, { text: "U4" },
      { text: "U5" }, { text: "U6" }, { text: "U7" }, { text: "I0" },
    ],
    bottomLabels: [
      { text: "U3" }, { text: "U2" }, { text: "U1" }, { text: "U0" },
      { text: "EU" }, { text: "I2" }, { text: "I1" }, { text: "GND" },
    ],
  },
};

// ────────────────────────────────────────────────
//  Exported lookup map: element type → SVG component
// ────────────────────────────────────────────────

export const gateSvgs: Record<string, React.FC<SvgProps>> = {
  buffer: BufferSvg,
  NOT: NotSvg,
  NOR2Inputs: (props) => <NorSvg {...props} inputs={2} />,
  NOR3Inputs: (props) => <NorSvg {...props} inputs={3} />,
  NOR4Inputs: (props) => <NorSvg {...props} inputs={4} />,
  NOR8Inputs: (props) => <NorSvg {...props} inputs={8} />,
  NAND2Inputs: NandSvg,
  NAND3Inputs: NandSvg,
  NAND4Inputs: NandSvg,
  NAND8Inputs: NandSvg,
  EXOR: ExorSvg,
  EXNOR: ExnorSvg,
  DEMUXm2: (props) => <IcSvg {...props} {...icConfigs.DEMUXm2} />,
  DEMUXm3: (props) => <IcSvg {...props} {...icConfigs.DEMUXm3} />,
  MUXm1: (props) => <IcSvg {...props} {...icConfigs.MUXm1} />,
  MUXm2: (props) => <IcSvg {...props} {...icConfigs.MUXm2} />,
  MUXm3: (props) => <IcSvg {...props} {...icConfigs.MUXm3} />,
  DFlipFlop: (props) => <IcSvg {...props} {...icConfigs.DFlipFlop} />,
  JKFlipFlop: (props) => <IcSvg {...props} {...icConfigs.JKFlipFlop} />,
  encoder: (props) => <IcSvg {...props} {...icConfigs.encoder} />,
};
