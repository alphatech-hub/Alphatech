// components/layout/AlphaMark.tsx
//
// This is a hand-coded SVG recreation of the Alphatech icon mark, used as a
// placeholder until the real logo files are dropped into /public/images.
//
// TO SWITCH TO THE REAL LOGO FILE LATER:
// 1. Save your icon-only logo PNG (transparent background ideally) as:
//      /public/images/logo-icon.png
// 2. Replace the contents of this component with:
//
//      import Image from "next/image";
//      export default function AlphaMark({ className = "h-11 w-11" }: { className?: string }) {
//        return (
//          <Image
//            src="/images/logo-icon.png"
//            alt="Alphatech logo"
//            width={44}
//            height={44}
//            className={className}
//          />
//        );
//      }
//
// That's it — every place that imports AlphaMark (Navbar, Footer) updates automatically.

export default function AlphaMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-label="Alphatech logo">
      <defs>
        <linearGradient id="blueLeg" x1="40" y1="10" x2="120" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7dd3fc" />
          <stop offset="0.5" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="silverLeg" x1="120" y1="20" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e2e8f0" />
          <stop offset="0.5" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="ribbon" x1="15" y1="178" x2="205" y2="135" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* circuit traces fanning into the letterform */}
      <g stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.9">
        <path d="M6,38 H46" className="trace-line" /><circle cx="6" cy="38" r="3.5" fill="#38bdf8" />
        <path d="M4,62 H52" className="trace-line" /><circle cx="4" cy="62" r="3.5" fill="#38bdf8" />
        <path d="M2,86 H58" className="trace-line" /><circle cx="2" cy="86" r="3.5" fill="#38bdf8" />
        <path d="M2,110 H64" className="trace-line" /><circle cx="2" cy="110" r="3.5" fill="#38bdf8" />
        <path d="M4,134 H58" className="trace-line" /><circle cx="4" cy="134" r="3.5" fill="#38bdf8" />
        <path d="M8,158 H50" className="trace-line" /><circle cx="8" cy="158" r="3.5" fill="#38bdf8" />
      </g>

      {/* silver right leg of the A (set behind) */}
      <polygon points="118,28 134,28 178,200 150,200" fill="url(#silverLeg)" />

      {/* blue left leg of the A (front) */}
      <polygon points="100,8 118,8 78,200 50,200" fill="url(#blueLeg)" />

      {/* gear ring */}
      <path
        fillRule="evenodd"
        fill="#cbd5e1"
        d="M200,112 L191.7,126.2 L190.1,142.6 L175,149.2 L164.1,161.5 L148,158 L131.9,161.5 L121,149.2 L105.9,142.6 L104.3,126.2 L96,112 L104.3,97.8 L105.9,81.4 L121,74.8 L131.9,62.5 L148,66 L164.1,62.5 L175,74.8 L190.1,81.4 L191.7,97.8 Z
           M178,112 A30,30 0 1,0 118,112 A30,30 0 1,0 178,112 Z"
      />

      {/* monitor + crossed tools inside the gear */}
      <rect x="123" y="98" width="50" height="34" rx="2" fill="#0f172a" stroke="#1d4ed8" strokeWidth="3" />
      <line x1="148" y1="132" x2="148" y2="140" stroke="#1d4ed8" strokeWidth="3" />
      <line x1="136" y1="142" x2="160" y2="142" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <line x1="133" y1="105" x2="163" y2="125" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <line x1="163" y1="105" x2="133" y2="125" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />

      {/* blue ribbon swoosh across the front */}
      <path d="M15,165 C70,140 130,180 205,135 L205,148 C130,193 70,153 15,178 Z" fill="url(#ribbon)" opacity="0.92" />
    </svg>
  );
}
