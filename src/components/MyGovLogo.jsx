export default function MyGovLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left rounded triangle */}
      <path
        d="M 40 35 Q 45 35 50 40 L 100 100 L 50 160 Q 45 165 40 165 Q 30 165 30 155 L 30 45 Q 30 35 40 35 Z"
        fill="black"
      />
      
      {/* Right rounded triangle */}
      <path
        d="M 100 35 Q 105 35 110 40 L 160 100 L 110 160 Q 105 165 100 165 Q 90 165 90 155 L 90 45 Q 90 35 100 35 Z"
        fill="black"
      />
    </svg>
  );
}