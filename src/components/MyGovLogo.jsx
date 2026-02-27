export default function MyGovLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left rounded triangle */}
      <path
        d="M 20 10 Q 26 10 32 18 L 104 100 L 32 182 Q 26 190 20 190 Q 8 190 8 178 L 8 22 Q 8 10 20 10 Z"
        fill="black"
      />
      
      {/* Right rounded triangle */}
      <path
        d="M 84 10 Q 90 10 96 18 L 168 100 L 96 182 Q 90 190 84 190 Q 72 190 72 178 L 72 22 Q 72 10 84 10 Z"
        fill="black"
      />
    </svg>
  );
}