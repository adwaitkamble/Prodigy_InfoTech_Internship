export function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/20 rounded w-1/3 mx-auto"></div>
          <div className="h-16 bg-white/20 rounded w-2/3 mx-auto"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Hourly forecast skeleton */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
        <div className="h-6 bg-white/20 rounded w-1/4 mb-4"></div>
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 bg-white/10 rounded-xl p-4 min-w-[80px] border border-white/20">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-8 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Weekly forecast skeleton */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
        <div className="h-6 bg-white/20 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-white/20 rounded w-16"></div>
                <div className="h-6 bg-white/20 rounded w-6"></div>
                <div className="h-4 bg-white/20 rounded w-24"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-4 bg-white/20 rounded w-8"></div>
                <div className="w-20 h-2 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
