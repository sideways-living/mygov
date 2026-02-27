export default function MyGovLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="leftTriangleMask">
          {/* White rectangle covering the non-overlapping part */}
          <rect x="0" y="0" width="95" height="200" fill="white" />
          {/* Transparent rectangle for the overlapping part */}
          <rect x="95" y="0" width="20" height="200" fill="black" />
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
        d="M 95 10 Q 101 10 107 18 L 179 100 L 107 182 Q 101 190 95 190 Q 83 190 83 178 L 83 22 Q 83 10 95 10 Z"
        fill="black"
      />
    </svg>
  );
}