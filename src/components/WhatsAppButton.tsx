import { Terminal } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black p-4 rounded-none border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:scale-105 transition-all duration-300 flex items-center justify-center group font-mono"
      aria-label="Chat on WhatsApp"
    >
      <Terminal className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-[#0a0a0a] border border-emerald-500/50 text-emerald-400 text-xs font-bold py-2 px-3 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none uppercase">
        &gt; INIT_CHAT
      </span>
    </a>
  );
}
