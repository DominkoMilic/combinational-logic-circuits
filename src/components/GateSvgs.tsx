import React from "react";
import type { PinConfig } from "../types";

// ── Types ──

interface SvgProps {
  width?: number;
  height?: number;
  className?: string;
}

export interface GateSvgProps extends SvgProps {
  topPins?: PinConfig[];
  bottomPins?: PinConfig[];
  onPinContextMenu?: (pin: PinConfig, e: React.MouseEvent) => void;
  pinRef?: (refIndex: number, refId: string, el: Element | null) => void;
  onBodyContextMenu?: (e: React.MouseEvent) => void;
}

interface PinPos {
  x: number;  // endpoint x (cable connection point)
  y: number;  // endpoint y
  sx: number; // stub start x (at gate body edge)
  sy: number; // stub start y
}

// ── Pin rendering sub-components ──

function PinStubs({
  pins,
  pos,
  sw = 3,
}: {
  pins: PinConfig[];
  pos: Record<string, PinPos>;
  sw?: number;
}) {
  return (
    <>
      {pins.map((pin) => {
        const p = pos[pin.refId];
        if (!p) return null;
        return (
          <line
            key={`stub-${pin.refId}`}
            x1={p.sx} y1={p.sy} x2={p.x} y2={p.y}
            stroke="#333" strokeWidth={sw}
          />
        );
      })}
    </>
  );
}

function PinTargets({
  pins,
  pos,
  size = 16,
  onCtx,
  pRef,
}: {
  pins: PinConfig[];
  pos: Record<string, PinPos>;
  size?: number;
  onCtx?: (pin: PinConfig, e: React.MouseEvent) => void;
  pRef?: (refIndex: number, refId: string, el: Element | null) => void;
}) {
  const half = size / 2;
  return (
    <>
      {pins.map((pin) => {
        const p = pos[pin.refId];
        if (!p) return null;
        return (
          <g key={`target-${pin.refId}`}>
            {/* Tiny invisible rect for accurate position tracking */}
            <rect
              x={p.x} y={p.y} width="0.5" height="0.5"
              fill="none" stroke="none"
              ref={(el) => pRef?.(pin.refIndex, pin.refId, el)}
            />
            {/* Visible endpoint dot */}
            <circle cx={p.x} cy={p.y} r="2.5" fill="#222" />
            {/* Enlarged invisible click target */}
            <rect
              x={p.x - half} y={p.y - half}
              width={size} height={size}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCtx?.(pin, e);
              }}
            />
          </g>
        );
      })}
    </>
  );
}

// ── Position calculation helpers ──

function evenY(count: number, top = 10, bottom = 90): number[] {
  const spacing = (bottom - top) / (count + 1);
  return Array.from({ length: count }, (_, i) => top + spacing * (i + 1));
}

function buildHorizPins(
  topPins: PinConfig[],
  bottomPins: PinConfig[],
  inputSx: number,
  outputSx: number,
): Record<string, PinPos> {
  const p: Record<string, PinPos> = {};
  const inYs = evenY(topPins.length);
  topPins.forEach((pin, i) => {
    p[pin.refId] = { x: -8, y: inYs[i], sx: inputSx, sy: inYs[i] };
  });
  const outYs = evenY(bottomPins.length);
  bottomPins.forEach((pin, i) => {
    p[pin.refId] = { x: 108, y: outYs[i], sx: outputSx, sy: outYs[i] };
  });
  return p;
}

function buildIcPins(
  topPins: PinConfig[],
  bottomPins: PinConfig[],
  vb = 200,
  m = 10,
): Record<string, PinPos> {
  const p: Record<string, PinPos> = {};
  const bodyW = vb - 2 * m;

  if (topPins.length > 0) {
    const colW = bodyW / topPins.length;
    topPins.forEach((pin, i) => {
      const x = m + i * colW + colW / 2;
      p[pin.refId] = { x, y: -8, sx: x, sy: m };
    });
  }

  if (bottomPins.length > 0) {
    const colW = bodyW / bottomPins.length;
    bottomPins.forEach((pin, i) => {
      const x = m + i * colW + colW / 2;
      p[pin.refId] = { x, y: vb + 8, sx: x, sy: vb - m };
    });
  }

  return p;
}

// ── Basic Gate Components ──

function BufferSvg(props: GateSvgProps) {
  const {
    width = 42, height = 42, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 18, 88) : {};

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} />}
      <polygon
        points="12,8 88,50 12,92"
        fill="#999" stroke="#333" strokeWidth="6" strokeLinejoin="round"
        onContextMenu={onBodyContextMenu}
      />
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

function NotSvg(props: GateSvgProps) {
  const {
    width = 42, height = 42, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 14, 84) : {};

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} />}
      <g onContextMenu={onBodyContextMenu}>
        <polygon
          points="8,8 66,50 8,92"
          fill="#999" stroke="#333" strokeWidth="6" strokeLinejoin="round"
        />
        <circle cx="76" cy="50" r="8" fill="#999" stroke="#333" strokeWidth="4" />
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

function NorSvg(props: GateSvgProps) {
  const {
    width = 70, height = 70, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  // Input stubs extend to x=30 (inside body curve), body covers the overlap
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 30, 95) : {};
  const nInputs = topPins.length;

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} sw={nInputs <= 4 ? 3 : 2.5} />}
      <g onContextMenu={onBodyContextMenu}>
        <path
          d="M 20,10 Q 65,8 82,50 Q 65,92 20,90 Q 32,50 20,10 Z"
          fill="#999" stroke="#333" strokeWidth="5"
        />
        <circle cx="89" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets
          pins={allPins} pos={pos}
          size={nInputs <= 4 ? 16 : 10}
          onCtx={onPinContextMenu} pRef={pinRef}
        />
      )}
    </svg>
  );
}

function NandSvg(props: GateSvgProps) {
  const {
    width = 70, height = 70, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 18, 101) : {};
  const nInputs = topPins.length;

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} sw={nInputs <= 4 ? 3 : 2.5} />}
      <g onContextMenu={onBodyContextMenu}>
        <path
          d="M 12,10 L 50,10 A 40,40 0 0 1 50,90 L 12,90 Z"
          fill="#999" stroke="#333" strokeWidth="5"
        />
        <circle cx="95" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets
          pins={allPins} pos={pos}
          size={nInputs <= 4 ? 16 : 10}
          onCtx={onPinContextMenu} pRef={pinRef}
        />
      )}
    </svg>
  );
}

function ExorSvg(props: GateSvgProps) {
  const {
    width = 90, height = 90, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 30, 88) : {};

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} />}
      <g onContextMenu={onBodyContextMenu}>
        <path d="M 17,10 Q 29,50 17,90" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M 25,10 Q 68,8 88,50 Q 68,92 25,90 Q 37,50 25,10 Z"
          fill="#999" stroke="#333" strokeWidth="5"
        />
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

function ExnorSvg(props: GateSvgProps) {
  const {
    width = 90, height = 90, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildHorizPins(topPins, bottomPins, 28, 90) : {};

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      {hasPins && <PinStubs pins={topPins} pos={pos} />}
      <g onContextMenu={onBodyContextMenu}>
        <path d="M 14,10 Q 26,50 14,90" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M 22,10 Q 60,8 76,50 Q 60,92 22,90 Q 34,50 22,10 Z"
          fill="#999" stroke="#333" strokeWidth="5"
        />
        <circle cx="84" cy="50" r="6" fill="#999" stroke="#333" strokeWidth="3.5" />
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

// ── IC Package Component ──

interface PinLabel {
  text: string;
  overline?: boolean;
}

function IcSvg({
  width = 100,
  height = 100,
  className,
  topPins = [],
  bottomPins = [],
  onPinContextMenu,
  pinRef,
  onBodyContextMenu,
  topLabels,
  bottomLabels,
}: GateSvgProps & { topLabels: PinLabel[]; bottomLabels: PinLabel[] }) {
  const vb = 200;
  const m = 10;
  const pinH = 30;
  const bodyW = vb - 2 * m;

  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos = hasPins ? buildIcPins(topPins, bottomPins, vb, m) : {};

  const tCols = topLabels.length;
  const bCols = bottomLabels.length;
  const maxCols = Math.max(tCols, bCols);
  const maxLen = Math.max(
    ...topLabels.map((l) => l.text.length),
    ...bottomLabels.map((l) => l.text.length)
  );
  const fontSize = Math.min(15, (bodyW / maxCols - 4) / (maxLen * 0.55));

  const chipTop = m + pinH + 8;
  const chipH = bodyW - 2 * pinH - 16;

  return (
    <svg
      width={width} height={height}
      viewBox={`0 0 ${vb} ${vb}`}
      className={className}
      overflow="visible"
    >
      {/* Pin stubs (drawn under the body so body covers overlap) */}
      {hasPins && <PinStubs pins={allPins} pos={pos} />}

      {/* Body */}
      <rect
        x={m} y={m} width={bodyW} height={bodyW}
        rx="6" ry="6" fill="#888" stroke="#333" strokeWidth="4"
        onContextMenu={onBodyContextMenu}
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

      {/* Top labels */}
      {topLabels.map((label, i) => {
        const tPinW = bodyW / tCols;
        const x = m + i * tPinW;
        const cx = x + tPinW / 2;
        const cy = m + pinH / 2 + 2;
        return (
          <g key={`tl${i}`}>
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

      {/* Bottom labels */}
      {bottomLabels.map((label, i) => {
        const bPinW = bodyW / bCols;
        const x = m + i * bPinW;
        const cx = x + bPinW / 2;
        const cy = vb - m - pinH / 2;
        return (
          <g key={`bl${i}`}>
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

      {/* Pin targets (on top of everything) */}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

// ── IC pin label configurations ──

const icConfigs: Record<
  string,
  { topLabels: PinLabel[]; bottomLabels: PinLabel[] }
> = {
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
    topLabels: [{ text: "VCC" }, { text: "U0" }, { text: "U1" }],
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
      { text: "VCC" }, { text: "S", overline: true }, { text: "Q" },
      { text: "Q", overline: true },
    ],
    bottomLabels: [
      { text: "R", overline: true }, { text: "D" }, { text: "CP" }, { text: "GND" },
    ],
  },
  JKFlipFlop: {
    topLabels: [
      { text: "VCC" }, { text: "S", overline: true }, { text: "Q" },
      { text: "Q", overline: true },
    ],
    bottomLabels: [
      { text: "R", overline: true }, { text: "CP" }, { text: "K" },
      { text: "J" }, { text: "GND" },
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

// ── Exported lookup: element type → SVG component ──

function Const0Svg(props: GateSvgProps) {
  const {
    width = 42, height = 42, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos: Record<string, PinPos> = {};
  if (hasPins) {
    bottomPins.forEach((pin) => {
      pos[pin.refId] = { x: 108, y: 50, sx: 82, sy: 50 };
    });
  }

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      <g onContextMenu={onBodyContextMenu}>
        <rect x="10" y="10" width="72" height="80" rx="10" fill="#b91c1c" stroke="#333" strokeWidth="5" />
        <text x="46" y="60" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="monospace">0</text>
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

function Const1Svg(props: GateSvgProps) {
  const {
    width = 42, height = 42, className,
    topPins = [], bottomPins = [],
    onPinContextMenu, pinRef, onBodyContextMenu,
  } = props;
  const allPins = [...topPins, ...bottomPins];
  const hasPins = allPins.length > 0;
  const pos: Record<string, PinPos> = {};
  if (hasPins) {
    bottomPins.forEach((pin) => {
      pos[pin.refId] = { x: 108, y: 50, sx: 82, sy: 50 };
    });
  }

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} overflow="visible">
      <g onContextMenu={onBodyContextMenu}>
        <rect x="10" y="10" width="72" height="80" rx="10" fill="#15803d" stroke="#333" strokeWidth="5" />
        <text x="46" y="60" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="monospace">1</text>
      </g>
      {hasPins && <PinStubs pins={bottomPins} pos={pos} />}
      {hasPins && (
        <PinTargets pins={allPins} pos={pos} onCtx={onPinContextMenu} pRef={pinRef} />
      )}
    </svg>
  );
}

export const gateSvgs: Record<string, React.FC<GateSvgProps>> = {
  buffer: BufferSvg,
  NOT: NotSvg,
  NOR2Inputs: NorSvg,
  NOR3Inputs: NorSvg,
  NOR4Inputs: NorSvg,
  NOR8Inputs: NorSvg,
  NAND2Inputs: NandSvg,
  NAND3Inputs: NandSvg,
  NAND4Inputs: NandSvg,
  NAND8Inputs: NandSvg,
  EXOR: ExorSvg,
  EXNOR: ExnorSvg,
  DEMUXm2: (p) => <IcSvg {...p} {...icConfigs.DEMUXm2} />,
  DEMUXm3: (p) => <IcSvg {...p} {...icConfigs.DEMUXm3} />,
  MUXm1: (p) => <IcSvg {...p} {...icConfigs.MUXm1} />,
  MUXm2: (p) => <IcSvg {...p} {...icConfigs.MUXm2} />,
  MUXm3: (p) => <IcSvg {...p} {...icConfigs.MUXm3} />,
  DFlipFlop: (p) => <IcSvg {...p} {...icConfigs.DFlipFlop} />,
  JKFlipFlop: (p) => <IcSvg {...p} {...icConfigs.JKFlipFlop} />,
  encoder: (p) => <IcSvg {...p} {...icConfigs.encoder} />,
  Const0: Const0Svg,
  Const1: Const1Svg,
};
