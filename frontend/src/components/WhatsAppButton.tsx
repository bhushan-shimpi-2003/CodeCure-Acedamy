export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/7743878583"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.25c-.28-.14-1.64-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.08-.15.18-.31.2-.58.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.92-.16-.27-.02-.42.12-.56.12-.12.28-.31.42-.46.14-.16.18-.27.27-.46.09-.18.04-.34-.02-.48-.06-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.34.99 2.64 1.13 2.82.14.18 1.94 2.96 4.69 4.15.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.66.23-1.22.16-1.33-.07-.11-.25-.18-.53-.32z" />
        <path d="M16.02 3.2c-6.99 0-12.67 5.67-12.67 12.65 0 2.22.58 4.4 1.67 6.31L3.2 28.8l6.8-1.79a12.76 12.76 0 0 0 6 1.52h.01c6.98 0 12.66-5.67 12.66-12.65 0-3.38-1.32-6.56-3.71-8.95a12.57 12.57 0 0 0-8.94-3.73zm0 23.2h-.01a10.63 10.63 0 0 1-5.4-1.47l-.39-.23-4.04 1.06 1.08-3.95-.25-.4a10.53 10.53 0 0 1-1.62-5.57c0-5.84 4.77-10.6 10.63-10.6 2.84 0 5.5 1.11 7.51 3.11a10.56 10.56 0 0 1 3.12 7.5c0 5.84-4.77 10.6-10.63 10.6z" />
      </svg>
      <span className="absolute right-full mr-4 bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
