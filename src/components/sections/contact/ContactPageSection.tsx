"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion, Variants } from "framer-motion";

const ContactExperience = dynamic(() => import("./ContactExperience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] md:min-h-[560px] flex flex-col items-center justify-center bg-black text-white/60 font-mono text-xs md:text-sm tracking-widest uppercase border border-[#50C878]/20">
      <div className="w-8 h-8 rounded-full border-2 border-[#50C878]/20 border-t-[#50C878] animate-spin mb-4"></div>
      <p>Loading 3D Studio Showcase...</p>
    </div>
  ),
});

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function ContactPageSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" }
    );
    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Sending your message...", {
      description: "Connecting to dispatch network...",
    });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
      if (!formRef.current) {
        toast.error("Form not found", { id: toastId });
        return;
      }
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      toast.success("Message Sent Successfully! ✨", {
        id: toastId,
        description:
          "Thank you for reaching out. Let's scale your fleet together!",
        duration: 5000,
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to Send Message ❌", {
        id: toastId,
        description:
          "Something went wrong while delivering your message. Please try again or email us directly.",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-black pt-10 sm:pt-15 md:pt-20 pb-20 md:pb-10 relative z-10">
      <div className="max-w-8xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="mb-8 md:mb-12 border-b border-white/10 pb-6"
        >
          <h1 className="text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter uppercase text-white leading-none break-normal">
            LET&apos;S TALK <span className="text-[#50C878]">BUSINESS</span>
          </h1>
        </motion.div>

        {/* Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Form Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="w-full lg:w-5/12 flex"
          >
            <div className="w-full border border-[#50C878]/30 rounded-3xl p-6 sm:p-10 md:p-12 bg-black shadow-[0_0_40px_rgba(80,200,120,0.05)] flex flex-col justify-between">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-sm sm:text-base font-bold uppercase tracking-widest text-[#50C878] mb-2 block"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-xl font-sans text-base text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#50C878] focus:bg-[#50C878]/5 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-sm sm:text-base font-bold uppercase tracking-widest text-[#50C878] mb-2 block"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Where can we reach you?"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-xl font-sans text-base text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#50C878] focus:bg-[#50C878]/5 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-sm sm:text-base font-bold uppercase tracking-widest text-[#50C878] mb-2 block"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help optimize your fleet?"
                    rows={5}
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-xl font-sans text-base text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#50C878] focus:bg-[#50C878]/5 transition-all duration-300 disabled:opacity-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#50C878] text-black font-mono text-sm sm:text-sm md:text-base font-extrabold tracking-widest uppercase rounded-full shadow-lg hover:bg-[#50C878]/90 hover:shadow-[0_0_20px_rgba(80,200,120,0.4)] transition-all duration-300 disabled:opacity-60 cursor-pointer overflow-hidden mt-4"
                >
                  <span className="transition-colors duration-300 text-black">
                    {loading ? "SENDING MESSAGE..." : "SEND MESSAGE"}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: 3D Canvas */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="w-full lg:w-7/12 min-h-[300px] sm:min-h-[380px] md:min-h-[560px] flex"
          >
            <div
              ref={canvasContainerRef}
              className="w-full h-full min-h-[300px] sm:min-h-[380px] md:min-h-[560px] bg-black rounded-3xl overflow-hidden border border-[#50C878]/30 shadow-[0_0_40px_rgba(80,200,120,0.05)] hover:cursor-grab active:cursor-grabbing relative"
            >
              {isInViewport ? (
                <ContactExperience />
              ) : (
                <div className="w-full h-full min-h-[300px] sm:min-h-[380px] md:min-h-[560px] flex items-center justify-center text-white/50 font-mono text-xs tracking-widest uppercase">
                  Scroll to view 3D Showcase
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
