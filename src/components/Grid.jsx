export function Grid() {
  return (
    <div className="w-full flex place-content-center">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="w-20 h-20 bg-zinc-800 border border-zinc-800 rounded-lg "></div>
        <div className="w-20 h-20 bg-zinc-800 border border-zinc-800 rounded-lg "></div>
        <div className="w-20 h-20 bg-zinc-800 border border-zinc-800 rounded-lg "></div>
        
      </div>
    </div>
  );
}
