"use client";

import { useRef } from "react";

const STORY_CHAPTERS = [
  {
    id: "01",
    title: "Getting in touch",
    content: "The first step in working together is getting in touch. You can contact us through our website or give us a call to discuss your dispatching needs and goals. We'll schedule a consultation to learn more about your fleet and determine if we're a good fit. During this call, we'll ask you about your preferred lanes, target rates, and expectations. It's also an opportunity for you to ask us any questions about our process, experience, and pricing.",
  },
  {
    id: "02",
    title: "Proposal and set up",
    content: "Once we've established that we're a good fit, we'll provide a detailed proposal outlining the scope of work. The proposal will include a breakdown of our dispatching services, dedicated support, and the clear percentage structure. If you're happy with the proposal, we'll set up our communication channels and integrate with your preferred factoring company. This system allows us to collaborate efficiently and stay highly organized while keeping you on the road.",
  },
  {
    id: "03",
    title: "Strategy",
    content: "We'll create a strategy specifically for your trucks, including preferred regions, home time requirements, and gross revenue targets. We'll discuss market trends, rate negotiation tactics, and the visual structure of your weekly planning. We'll also determine the calls to action for brokers to ensure you're getting premium freight. We'll talk about the documentation you'll need, such as rate cons and BOLs, and exactly how our back-office team will manage it.",
  },
  {
    id: "04",
    title: "Execution",
    content: "With the strategy in place, our team hits the load boards and our direct broker network. We negotiate aggressively on your behalf, completely shielding you from the back-and-forth haggling. As soon as a load is delivered, we instantly submit the necessary paperwork to your factoring company. You get paid faster, and you never have to spend your weekends catching up on administrative tasks.",
  }
];

export function StoryStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-transparent py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background glowing atmospheric orb for glassmorphism illumination */}
      <div 
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] h-[700px] bg-gradient-to-r from-[#50C878]/30 to-[#0B3D2E]/40 rounded-[100%] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display font-black text-4xl md:text-6xl text-[#50C878] uppercase tracking-tight mb-4 drop-shadow-lg">
            ABOUT US
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Our story and how we partner with you to scale your trucking business.
          </p>
        </div>

        {/* The Stacking Container */}
        <div className="relative w-full flex flex-col pb-[30vh]">
          {STORY_CHAPTERS.map((chapter, index) => {
            return (
              <Card 
                key={chapter.id}
                chapter={chapter}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ 
  chapter, 
  index,
}: { 
  chapter: typeof STORY_CHAPTERS[0], 
  index: number,
}) {
  return (
    <div
      style={{
        // Native sticky handles the perfect stacking!
        position: "sticky",
        // The top offset increases slightly for each card to leave the previous card's header visible
        top: `calc(15vh + ${index * 40}px)`,
        zIndex: index,
      }}
      className="w-full mb-24 md:mb-32"
    >
      <div 
        className="w-full relative overflow-hidden backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 0 40px rgba(255, 255, 255, 0.02), 0 -10px 40px rgba(0, 0, 0, 0.8)",
          background: "rgba(10, 10, 10, 0.65)",
        }}
      >
        {/* The internal glow for true glassmorphism as seen in the reference */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 10% 0%, rgba(80, 200, 120, 0.12) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 flex justify-between items-start mb-8 md:mb-12 border-b border-white/10 pb-6">
          <h3 className="font-display text-2xl md:text-4xl text-white font-medium" style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}>
            {chapter.title}
          </h3>
          <span className="font-mono text-xl md:text-3xl text-[#50C878] font-light">
            /{chapter.id}
          </span>
        </div>
        
        <p className="relative z-10 text-[#a0a0a0] font-sans text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose">
          {chapter.content}
        </p>
      </div>
    </div>
  );
}
