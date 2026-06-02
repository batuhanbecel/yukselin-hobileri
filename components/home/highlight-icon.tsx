type HighlightIconProps = {
  iconKey?: "yarn" | "leaf" | "wind" | "bag" | "heart" | "star" | "none";
};

export function HighlightIcon({ iconKey = "yarn" }: HighlightIconProps) {
  if (iconKey === "none") return null;

  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className: "size-6",
  } as const;

  switch (iconKey) {
    case "yarn":
      return (
        <svg {...common} fill="none">
          <path
            d="M6 12c2-3 4-4 6-4s4 1 6 4M4 16c2.5-2 5-3 8-3s5.5 1 8 3M8 8c1.5-1.5 3-2 4-2s2.5.5 4 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 3c-3 4-3 8 0 12 3-4 3-8 0-12zM6 11c1 4 4 6 6 6-1-4-4-6-6-6zm12 0c-1 4-4 6-6 6 1-4 4-6 6-6z" />
        </svg>
      );
    case "wind":
      return (
        <svg {...common} fill="none">
          <path
            d="M4 12c4-5 12-5 16 0M8 7c1.5-1 6.5-1 8 0M2 16h20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bag":
      return (
        <svg {...common} fill="none">
          <path
            d="M7 8h10l-1 12H8L7 8zm2 0V6a3 3 0 016 0v2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 21s-7-4.5-9-9.5C2 7 5 4 8 4c2 0 3 1 4 3 1-2 2-3 4-3 3 0 6 3 5 7.5C19 16.5 12 21 12 21z" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2l2.9 6.5L22 9.3l-5 5 1.2 7.2L12 18l-6.2 3.5L7 14.3l-5-5 7.1-.8L12 2z" />
        </svg>
      );
  }
}
