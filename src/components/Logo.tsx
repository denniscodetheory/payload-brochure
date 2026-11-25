/** Den Modular logo: four modules (two solid, two outlined) and the wordmark. Uses currentColor so it works on black or white. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 164 40" className={className} role="img" aria-label="Den Modular" fill="currentColor">
      <rect x="2" y="2" width="16" height="16" />
      <rect x="22" y="2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="2" y="22" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="22" y="22" width="16" height="16" />
      <text x="50" y="19" fontSize="18" fontWeight="800" letterSpacing="1.2" fontFamily="inherit">DEN</text>
      <text x="50" y="36" fontSize="12.5" fontWeight="500" letterSpacing="4" fontFamily="inherit">MODULAR</text>
    </svg>
  )
}
