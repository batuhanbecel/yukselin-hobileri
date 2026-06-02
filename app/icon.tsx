import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf3e8",
          borderRadius: "50%",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="12" fill="#c4756c" opacity="0.6" />
          <path
            d="M6 16 Q 16 6, 26 16 M 6 16 Q 16 26, 26 16 M 10 8 Q 16 16, 22 24 M 10 24 Q 16 16, 22 8"
            stroke="#4a3528"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
