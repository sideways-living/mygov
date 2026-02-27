export default function MyGovLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="leftTriangleMask">
          {/* White rectangle covering the non-overlapping part */}
          <rect x="0" y="0" width="62" height="200" fill="white" />
          {/* Transparent rectangle for the 50% overlapping part */}
          <rect x="62" y="0" width="50" height="200" fill="black" />
        </mask>
      </defs>
      
      {/* Left rounded triangle with mask */}
      <path
        d="M 20 10 Q 26 10 32 18 L 104 100 L 32 182 Q 26 190 20 190 Q 8 190 8 178 L 8 22 Q 8 10 20 10 Z"
        fill="black"
        mask="url(#leftTriangleMask)"
      />
      
      {/* Right rounded triangle */}
      <path
        d="M 62 10 Q 68 10 74 18 L 146 100 L 74 182 Q 68 190 62 190 Q 50 190 50 178 L 50 22 Q 50 10 62 10 Z"
        fill="black"
      />
    </svg>
  );
}