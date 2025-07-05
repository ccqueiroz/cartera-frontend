export const NeonSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <defs>
        <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DF9FF" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7DF9FF" />
        </linearGradient>
        <radialGradient id="centerGlow">
          <stop offset="30%" stopColor="#7DF9FF" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#C084FC" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <mask id="cutout">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="24" cy="24" r="10" fill="black" />
        </mask>
      </defs>
      <g mask="url(#cutout)">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="20"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="24" cy="24" r="20" fill="url(#centerGlow)" />
      </g>
    </svg>
  );
};
