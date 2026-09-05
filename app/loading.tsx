export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09080d] text-white grid place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#9b5cff]" />
        <p className="mono text-xs uppercase tracking-[.3em] text-white/45">
          Booting Saksham.exe
        </p>
      </div>
    </div>
  );
}
