import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yuisei Maruyama — Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FLIGHT_LOG = [
  { codes: "IAD · BWI" },
  { codes: "CDG" },
  { codes: "MUC · BER" },
  { codes: "BCN" },
  { codes: "VCE · FCO · MXP" },
  { codes: "AMS" },
  { codes: "LHR · BRS" },
  { codes: "BRU" },
  { codes: "ICN" },
  { codes: "HKG" },
  { codes: "KUL" },
];

const loadFont = async (url: string): Promise<ArrayBuffer | null> => {
  try {
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
};

const OGImage = async () => {
  const [interBold, interRegular] = await Promise.all([
    loadFont(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
    ),
    loadFont(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#09090B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #1a1a20 0%, #111114 50%, #0d0d10 100%)",
            borderRadius: "20px",
            border: "1px solid rgba(192,192,200,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(192,192,200,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 36px",
              borderBottom: "1px solid rgba(192,192,200,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "13px",
                color: "#6B6B78",
                letterSpacing: "0.2em",
              }}
            >
              ✈ BOARDING PASS
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "13px",
                color: "#6B6B78",
                letterSpacing: "0.15em",
              }}
            >
              CHROME AIRWAYS
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: "28px 36px",
              gap: "36px",
            }}
          >
            {/* Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "22px",
              }}
            >
              {/* Passenger Name */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "10px",
                    color: "#6B6B78",
                    letterSpacing: "0.15em",
                    marginBottom: "4px",
                  }}
                >
                  PASSENGER
                </span>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "64px",
                    fontWeight: 700,
                    lineHeight: 0.9,
                    background: "linear-gradient(170deg, #C0C0C8 0%, #F5F5F7 30%, #0a0a14 48%, #ffffff 52%, #0a0a14 56%, #F5F5F7 70%, #C0C0C8 100%)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  YUISEI
                </span>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "64px",
                    fontWeight: 700,
                    lineHeight: 0.9,
                    background: "linear-gradient(170deg, #C0C0C8 0%, #F5F5F7 30%, #0a0a14 48%, #ffffff 52%, #0a0a14 56%, #F5F5F7 70%, #C0C0C8 100%)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  MARUYAMA
                </span>
              </div>

              {/* FROM → TO */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>FROM</span>
                  <span style={{ fontFamily: "Inter", fontSize: "22px", color: "#E8E8EC", fontWeight: 600 }}>TOKYO</span>
                  <span style={{ fontFamily: "Inter", fontSize: "11px", color: "#9898A1" }}>TYO</span>
                </div>
                <span style={{ fontFamily: "Inter", fontSize: "16px", color: "#6B6B78", letterSpacing: "0.1em" }}>
                  ── ✈ ──
                </span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>TO</span>
                  <span style={{ fontFamily: "Inter", fontSize: "22px", color: "#E8E8EC", fontWeight: 600 }}>∞</span>
                  <span style={{ fontFamily: "Inter", fontSize: "11px", color: "#9898A1" }}>FUTURE</span>
                </div>
              </div>

              {/* DATE / SEAT / CLASS / GATE */}
              <div style={{ display: "flex", gap: "28px" }}>
                {[
                  { label: "DATE", value: "04 NOV 1996" },
                  { label: "SEAT", value: "03" },
                  { label: "CLASS", value: "BUSINESS" },
                  { label: "GATE", value: "2020" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>{label}</span>
                    <span style={{ fontFamily: "Inter", fontSize: "15px", color: "#E8E8EC" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* FLIGHT LOG */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>
                  FLIGHT LOG · 11 Countries
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {FLIGHT_LOG.map(({ codes }) => (
                    <span
                      key={codes}
                      style={{
                        fontFamily: "Inter",
                        fontSize: "11px",
                        color: "#9898A1",
                        background: "rgba(192,192,200,0.06)",
                        border: "1px solid rgba(192,192,200,0.1)",
                        borderRadius: "4px",
                        padding: "2px 8px",
                      }}
                    >
                      {codes}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Role + Company */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                minWidth: "200px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>ROLE</span>
                  <span style={{ fontFamily: "Inter", fontSize: "18px", color: "#E8E8EC" }}>Frontend Engineer</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>COMPANY</span>
                  <span style={{ fontFamily: "Inter", fontSize: "18px", color: "#E8E8EC" }}>CyberAgent, Inc.</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "Inter", fontSize: "10px", color: "#6B6B78", letterSpacing: "0.15em" }}>ACCOUNT</span>
                  <span style={{ fontFamily: "Inter", fontSize: "18px", color: "#E8E8EC" }}>Y_METRO</span>
                </div>
              </div>

              {/* URL */}
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: "13px",
                  color: "#6B6B78",
                  letterSpacing: "0.05em",
                }}
              >
                yuisei-maruyama.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        interBold && { name: "Inter", data: interBold, weight: 700 as const, style: "normal" as const },
        interRegular && { name: "Inter", data: interRegular, weight: 400 as const, style: "normal" as const },
      ].filter((f): f is { name: string; data: ArrayBuffer; weight: 700 | 400; style: "normal" } => Boolean(f)),
    },
  );
};

export default OGImage;
