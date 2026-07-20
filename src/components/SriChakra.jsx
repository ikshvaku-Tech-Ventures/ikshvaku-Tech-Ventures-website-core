import './SriChakra.css';

/**
 * Sri Chakra (Sri Yantra) — Sacred Geometry
 * 
 * Built with pure SVG. The yantra consists of:
 *   1. Bhupura — the square outer boundary with gates
 *   2. Three concentric circles
 *   3. Two lotus rings (16 outer petals, 8 inner petals)
 *   4. Nine interlocking triangles (4 upward ▲, 5 downward ▽)
 *   5. Bindu — the central point
 */
export default function SriChakra() {
  const cx = 500, cy = 500; // center
  const r = 420; // outer square half-size

  // Helper: point on circle
  const pt = (angle, radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return `${cx + radius * Math.cos(rad)},${cy + radius * Math.sin(rad)}`;
  };

  // Generate lotus petals as SVG path arcs
  const lotusPetals = (count, innerR, outerR) => {
    const petals = [];
    const angleStep = 360 / count;
    for (let i = 0; i < count; i++) {
      const a1 = i * angleStep;
      const a2 = (i + 0.5) * angleStep;
      const a3 = (i + 1) * angleStep;
      
      const rad1 = (a1 - 90) * (Math.PI / 180);
      const rad2 = (a2 - 90) * (Math.PI / 180);
      const rad3 = (a3 - 90) * (Math.PI / 180);
      
      const ix1 = cx + innerR * Math.cos(rad1);
      const iy1 = cy + innerR * Math.sin(rad1);
      const ox = cx + outerR * Math.cos(rad2);
      const oy = cy + outerR * Math.sin(rad2);
      const ix2 = cx + innerR * Math.cos(rad3);
      const iy2 = cy + innerR * Math.sin(rad3);
      
      petals.push(
        <path
          key={`petal-${count}-${i}`}
          d={`M ${ix1} ${iy1} Q ${ox} ${oy} ${ix2} ${iy2}`}
          className="sri-petal"
        />
      );
    }
    return petals;
  };

  /*
   * The 9 interlocking triangles of Sri Yantra.
   * 4 upward (Shiva / masculine) + 5 downward (Shakti / feminine)
   * These are approximated at aesthetically correct proportions.
   */
  const trianglesUp = [
    // Outermost upward triangle
    { y1: cy - 330, y2: cy + 260, w: 310 },
    // Second upward
    { y1: cy - 230, y2: cy + 210, w: 250 },
    // Third upward
    { y1: cy - 150, y2: cy + 155, w: 190 },
    // Innermost upward
    { y1: cy - 70,  y2: cy + 100, w: 115 },
  ];

  const trianglesDown = [
    // Outermost downward triangle
    { y1: cy + 340, y2: cy - 250, w: 320 },
    // Second downward
    { y1: cy + 280, y2: cy - 195, w: 270 },
    // Third downward
    { y1: cy + 220, y2: cy - 140, w: 215 },
    // Fourth downward
    { y1: cy + 160, y2: cy - 85, w: 155 },
    // Innermost downward
    { y1: cy + 95,  y2: cy - 30, w: 85 },
  ];

  return (
    <div className="sri-chakra-container" aria-hidden="true">
      <svg
        className="sri-chakra-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sri-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="sri-yantra-group">
          {/* ── 1. Bhupura (outer square boundary with gates) ── */}
          <g className="sri-bhupura">
            {/* Three nested squares */}
            {[0, 12, 24].map((inset, i) => (
              <rect
                key={`sq-${i}`}
                x={cx - r + inset}
                y={cy - r + inset}
                width={(r - inset) * 2}
                height={(r - inset) * 2}
                className="sri-line"
              />
            ))}
            {/* Gates (T-shaped openings on each side) */}
            {[0, 90, 180, 270].map((angle) => {
              const gateW = 40, gateD = 30;
              const rad = (angle) * (Math.PI / 180);
              const cos = Math.cos(rad), sin = Math.sin(rad);
              const baseX = cx + (r - 24) * sin;
              const baseY = cy - (r - 24) * cos;
              return (
                <line
                  key={`gate-${angle}`}
                  x1={baseX - gateW * cos}
                  y1={baseY - gateW * sin}
                  x2={baseX + gateW * cos}
                  y2={baseY + gateW * sin}
                  className="sri-line"
                />
              );
            })}
          </g>

          {/* ── 2. Three concentric circles ── */}
          <g className="sri-circles">
            <circle cx={cx} cy={cy} r={365} className="sri-line" />
            <circle cx={cx} cy={cy} r={350} className="sri-line" />
            <circle cx={cx} cy={cy} r={335} className="sri-line" />
          </g>

          {/* ── 3. Outer lotus (16 petals) ── */}
          <g className="sri-lotus-outer">
            {lotusPetals(16, 335, 365)}
          </g>

          {/* ── 4. Inner lotus (8 petals) ── */}
          <g className="sri-lotus-inner">
            {lotusPetals(8, 290, 330)}
          </g>

          {/* ── 5. Inner circle containing triangles ── */}
          <circle cx={cx} cy={cy} r={290} className="sri-line sri-inner-circle" />

          {/* ── 6. Upward triangles (Shiva) ── */}
          <g className="sri-triangles-up">
            {trianglesUp.map((t, i) => (
              <polygon
                key={`up-${i}`}
                points={`${cx},${t.y1} ${cx - t.w},${t.y2} ${cx + t.w},${t.y2}`}
                className="sri-triangle sri-triangle-up"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </g>

          {/* ── 7. Downward triangles (Shakti) ── */}
          <g className="sri-triangles-down">
            {trianglesDown.map((t, i) => (
              <polygon
                key={`down-${i}`}
                points={`${cx},${t.y1} ${cx - t.w},${t.y2} ${cx + t.w},${t.y2}`}
                className="sri-triangle sri-triangle-down"
                style={{ animationDelay: `${(i * 0.3) + 0.15}s` }}
              />
            ))}
          </g>

          {/* ── 8. Bindu (central point) ── */}
          <circle cx={cx} cy={cy} r={6} className="sri-bindu" />
          <circle cx={cx} cy={cy} r={14} className="sri-line sri-bindu-ring" />
        </g>
      </svg>
    </div>
  );
}
