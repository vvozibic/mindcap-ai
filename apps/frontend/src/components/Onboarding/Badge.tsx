export default function Badge({ large }: { large?: boolean }) {
  const size = large ? 200 : 96;
  return (
    <div className="relative flex justify-center my-6">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        <polygon
          points="100,20 170,60 170,140 100,180 30,140 30,60"
          fill="url(#hexGradient)"
          stroke="#60A5FA"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
