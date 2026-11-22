// Small line-drawn flower icons scattered over a section as a quiet background pattern.
// They take their colour from `currentColor`, and sit behind the content (see .testimonials__floral in the CSS).
type Kind = 'daisy' | 'blossom' | 'sprig'

function Icon({ kind }: { kind: Kind }) {
  if (kind === 'daisy') {
    return (
      <>
        {Array.from({ length: 8 }, (_, k) => (
          <ellipse key={k} cx={12} cy={5.6} rx={2} ry={4} transform={`rotate(${k * 45} 12 12)`} fill="currentColor" fillOpacity={0.12} />
        ))}
        <circle cx={12} cy={12} r={2.2} fill="currentColor" fillOpacity={0.35} />
      </>
    )
  }
  if (kind === 'blossom') {
    return (
      <>
        {Array.from({ length: 5 }, (_, k) => (
          <circle key={k} cx={12} cy={6.4} r={3.4} transform={`rotate(${k * 72} 12 12)`} fill="currentColor" fillOpacity={0.12} />
        ))}
        <circle cx={12} cy={12} r={1.6} fill="currentColor" fillOpacity={0.45} stroke="none" />
      </>
    )
  }
  return (
    <>
      <path d="M12 22C12 16 12 10 12 5" />
      <path d="M12 16c-3-.2-5-2-5.6-4.6 3 .2 5 1.8 5.6 4.6zM12 12c3-.2 5-2 5.6-4.6-3 .2-5 1.8-5.6 4.6z" fill="currentColor" fillOpacity={0.14} />
      <circle cx={12} cy={4} r={1.8} fill="currentColor" fillOpacity={0.3} />
    </>
  )
}

// left %, top %, size (rem), rotation (deg)
const spots: [Kind, number, number, number, number][] = [
  ['daisy', 4, 12, 1.9, 10],
  ['blossom', 13, 6, 1.3, -14],
  ['sprig', 22, 20, 1.7, 24],
  ['daisy', 33, 8, 1.1, 0],
  ['blossom', 46, 4, 1.7, 18],
  ['sprig', 60, 10, 1.4, -20],
  ['daisy', 71, 5, 1.6, 8],
  ['blossom', 82, 14, 1.2, -6],
  ['sprig', 91, 7, 1.8, 28],
  ['blossom', 96, 30, 1.4, 12],
  ['daisy', 2, 42, 1.4, -10],
  ['sprig', 7, 64, 1.9, -30],
  ['daisy', 16, 82, 1.7, 14],
  ['blossom', 27, 91, 1.2, 0],
  ['sprig', 39, 88, 1.5, 20],
  ['daisy', 52, 93, 1.3, -8],
  ['blossom', 64, 86, 1.8, 16],
  ['sprig', 75, 92, 1.4, -24],
  ['daisy', 85, 84, 1.9, 6],
  ['blossom', 94, 66, 1.3, -12],
  ['daisy', 97, 48, 1.1, 0],
  ['sprig', 12, 30, 1.2, 40],
]

export default function Floral({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {spots.map(([kind, x, y, size, rot], k) => (
        <svg
          key={k}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          style={{ left: `${x}%`, top: `${y}%`, width: `${size}rem`, height: `${size}rem`, transform: `rotate(${rot}deg)` }}
        >
          <Icon kind={kind} />
        </svg>
      ))}
    </div>
  )
}
