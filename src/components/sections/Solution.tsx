import { XCircle, CheckCircle2 } from "lucide-react";

export function Solution() {
  const badPoints = [
    "Disorganized WhatsApp groups & lost load details",
    "Manual driver tracking & paper BOLs",
    "No live rate tracking, analytics, or broker sync",
    "Fragmented driver chats & missing updates",
    "No integrated invoicing or factoring sync"
  ];

  const goodPoints = [
    "All-in-one dispatch dashboard with real-time tracking",
    "Seamless load assignment with live GPS & digital docs",
    "Automated metrics, rate negotiations & performance reports",
    "Built-in unified comms, announcement board & document hub",
    "Integrated billing, automated factoring & permissions"
  ];

  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden z-20">
      {/* Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Top Gradient Fade to blend with RoadJourney */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#50C878]" />
          <span className="text-[#50C878] font-bold tracking-[0.15em] text-sm md:text-base uppercase">
            Why Nexar Dispatch?
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-black text-white text-center leading-[1.05] tracking-tighter mb-16 md:mb-20 max-w-4xl drop-shadow-md">
          There&apos;s a smarter way to<br className="hidden md:block"/> manage your freight
        </h2>

        {/* Comparison Container */}
        <div className="w-full max-w-[1000px] bg-[#080808] rounded-3xl border border-white/5 p-1.5 md:p-2 flex flex-col md:flex-row shadow-2xl relative">
          
          {/* Subtle glow behind the entire container */}
          <div className="absolute inset-0 bg-[#50C878]/5 blur-3xl -z-10 rounded-3xl" />

          {/* Left Column (Traditional) */}
          <div className="flex-1 p-8 md:p-12 md:pr-10 bg-[#0a0a0a] rounded-[1.25rem] md:rounded-r-none md:rounded-l-[1.25rem]">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-10">Other Tools</h3>
            <ul className="space-y-6 md:space-y-8">
              {badPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5 opacity-80" strokeWidth={2.5} />
                  <span className="text-white/50 text-sm md:text-base font-medium leading-relaxed pr-4">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Nexar Dispatch) */}
          <div className="flex-1 p-8 md:p-12 rounded-[1.25rem] bg-black border border-[#50C878]/30 relative shadow-[0_0_50px_rgba(80,200,120,0.07)] overflow-hidden">
            {/* Ambient Glow inside the card */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#50C878]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#50C878]/10 blur-[80px] rounded-full pointer-events-none" />

            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-10 relative z-10">Nexar Dispatch</h3>
            <ul className="space-y-6 md:space-y-8 relative z-10">
              {goodPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#50C878] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-white/95 text-sm md:text-base font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
