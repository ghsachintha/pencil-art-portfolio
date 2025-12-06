"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Light Mode Gradient */}
      <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-1000">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-pink-200/30 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Dark Mode Gradient */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-pink-900/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('/noise.png')] pointer-events-none" />
    </div>
  );
}
