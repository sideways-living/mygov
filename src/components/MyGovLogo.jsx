export default function MyGovLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left vertical rounded bar */}
      <rect x="40" y="35" width="35" height="130" rx="17.5" fill="black" />
      
      {/* Right chevron/arrow shape */}
      <path
        d="M 100 35 L 160 100 L 100 165 C 95 160 92.5 155 92.5 145 L 92.5 55 C 92.5 45 95 40 100 35 Z"
        fill="black"
      />
      <rect x="100" y="70" width="35" height="60" rx="17.5" fill="black" transform="rotate(25 117.5 100)" />
    </svg>
  );
}