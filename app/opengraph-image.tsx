import { ImageResponse } from "next/og";

export const alt = "Capital Hoardings — specialist hoarding, ACT & Southern NSW";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Drawn rather than photographed so it stays on brand and
 * needs no asset — the hoarding-panel motif in the site's navy and sky.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(115deg, #04121f 0%, #11427a 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* hazard rule */}
        <div
          style={{
            display: "flex",
            height: 10,
            width: "100%",
            backgroundImage:
              "repeating-linear-gradient(-45deg, #11427a 0 14px, #62b6e4 14px 28px)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#62b6e4",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                background: "#62b6e4",
                transform: "rotate(45deg)",
              }}
            />
            Specialist hoarding — ACT &amp; Southern NSW
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#ffffff" }}>Building protection.</span>
            <span style={{ color: "#62b6e4" }}>Delivering confidence.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.75)",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#fff" }}>
            CAPITAL HOARDINGS
          </div>
          <div style={{ display: "flex" }}>capitalhoardings.com.au</div>
        </div>
      </div>
    ),
    size
  );
}
