import { ImageResponse } from "next/og";

export const alt = "Yüksel'in Hobileri — El emeği örgü çantalar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #faf3e8 0%, #f3e8d4 50%, #e9b8a8 100%)",
          color: "#4a3528",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Decorative yarn ball */}
        <svg
          width="220"
          height="220"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", right: 60, top: 60, opacity: 0.4 }}
        >
          <circle cx="100" cy="100" r="80" fill="#c4756c" />
          <path
            d="M30 100 Q 100 40, 170 100 M 30 100 Q 100 160, 170 100 M 60 50 Q 100 100, 140 150 M 60 150 Q 100 100, 140 50"
            stroke="#4a3528"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 80,
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: "#c4756c",
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            merhaba, hoş geldin
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Yüksel&apos;in Hobileri
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#8a7868",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            El emeği örgü çantalar · Tek tek örüldü
          </div>
        </div>
      </div>
    ),
    size
  );
}
