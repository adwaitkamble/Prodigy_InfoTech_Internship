import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Flag, Clock, Timer as StopwatchIcon } from "lucide-react";

interface LapTime {
  number: number;
  time: number;
  split: number;
  timestamp: string;
}

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);
    setIsRunning(true);
  }, [elapsedTime]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setElapsedTime(0);
    setIsRunning(false);
    setLapTimes([]);
  }, []);

  const recordLap = useCallback(() => {
    if (!isRunning) return;
    
    const lapTime = elapsedTime;
    const lapNumber = lapTimes.length + 1;
    const currentTime = new Date();
    
    const newLap: LapTime = {
      number: lapNumber,
      time: lapTime,
      split: lapNumber === 1 ? lapTime : lapTime - lapTimes[lapNumber - 2].time,
      timestamp: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setLapTimes(prev => [...prev, newLap]);
  }, [isRunning, elapsedTime, lapTimes]);

  const toggleTimer = useCallback(() => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }, [isRunning, startTimer, stopTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetTimer();
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        if (isRunning) {
          recordLap();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTimer, resetTimer, recordLap, isRunning]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Find best and worst lap splits for highlighting
  const getBestWorstLaps = () => {
    if (lapTimes.length <= 1) return { bestIndex: -1, worstIndex: -1 };
    
    let bestSplit = Infinity;
    let worstSplit = 0;
    let bestIndex = -1;
    let worstIndex = -1;
    
    lapTimes.forEach((lap, index) => {
      if (index > 0) { // Skip first lap for split comparison
        if (lap.split < bestSplit) {
          bestSplit = lap.split;
          bestIndex = index;
        }
        if (lap.split > worstSplit) {
          worstSplit = lap.split;
          worstIndex = index;
        }
      }
    });
    
    return { bestIndex, worstIndex };
  };

  const { bestIndex, worstIndex } = getBestWorstLaps();

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center">
          <StopwatchIcon className="text-blue-600 mr-3 h-8 w-8" />
          Timer
        </h1>
        <p className="text-slate-600 text-sm">Precision timing made simple</p>
      </header>

      {/* Main Timer Card */}
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-8">
          {/* Time Display */}
          <div className="text-center mb-8">
            <div className="font-mono text-6xl font-semibold text-slate-800 tracking-wider mb-2">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-slate-500 text-sm font-medium tracking-wide">
              MM:SS:MS
            </div>
            {/* Running indicator */}
            {isRunning && (
              <div className="mt-4">
                <div className="inline-flex items-center text-emerald-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-subtle mr-2"></div>
                  <span className="text-sm font-medium">Running</span>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="space-y-4">
            {/* Primary Action Button (Start/Stop) */}
            <Button
              onClick={toggleTimer}
              className={`w-full font-semibold py-4 px-6 rounded-xl stopwatch-button shadow-lg hover:shadow-xl ${
                isRunning 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              size="lg"
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={resetTimer}
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl stopwatch-button"
                size="default"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              
              <Button
                onClick={recordLap}
                disabled={!isRunning}
                className={`font-semibold py-3 px-4 rounded-xl stopwatch-button ${
                  isRunning 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'bg-slate-500 text-white opacity-50 cursor-not-allowed'
                }`}
                size="default"
              >
                <Flag className="mr-2 h-4 w-4" />
                Lap
              </Button>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Keyboard Shortcuts</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <kbd className="bg-white px-2 py-1 rounded border text-slate-800 font-mono">Space</kbd> Start/Stop
              </div>
              <div>
                <kbd className="bg-white px-2 py-1 rounded border text-slate-800 font-mono">R</kbd> Reset
              </div>
              <div>
                <kbd className="bg-white px-2 py-1 rounded border text-slate-800 font-mono">L</kbd> Lap
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lap Times Section */}
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <Clock className="text-slate-600 mr-2 h-5 w-5" />
            Lap Times
            <span className="ml-2 bg-slate-100 text-slate-600 text-sm px-2 py-1 rounded-full">
              {lapTimes.length}
            </span>
          </h2>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {lapTimes.length === 0 ? (
            /* Empty state */
            <div className="p-8 text-center text-slate-500">
              <Clock className="h-12 w-12 mb-4 opacity-50 mx-auto" />
              <p className="text-sm">No lap times recorded yet</p>
              <p className="text-xs mt-1">Start the timer and press Lap to record times</p>
            </div>
          ) : (
            /* Lap times list */
            <div>
              {[...lapTimes].reverse().map((lap, reversedIndex) => {
                const index = lapTimes.length - 1 - reversedIndex;
                const isBest = index === bestIndex && lapTimes.length > 1;
                const isWorst = index === worstIndex && lapTimes.length > 2;
                
                let containerClass = "flex items-center justify-between py-3 px-6 border-b border-slate-50 hover:bg-slate-25 transition-colors";
                let numberClass = "w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3";
                let timeClass = "font-mono text-sm font-medium text-slate-800";
                let splitClass = "text-xs text-slate-500";
                
                if (isBest) {
                  containerClass += " bg-emerald-50";
                  numberClass = "w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3";
                  timeClass = "font-mono text-sm font-medium text-emerald-800";
                  splitClass = "text-xs text-emerald-600 font-medium";
                } else if (isWorst) {
                  containerClass += " bg-red-50";
                  numberClass = "w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3";
                  timeClass = "font-mono text-sm font-medium text-red-800";
                  splitClass = "text-xs text-red-600 font-medium";
                }
                
                const splitText = index === 0 ? 
                  `+${formatTime(lap.split)}` : 
                  `+${formatTime(lap.split)}${isBest ? ' ⚡ Best' : isWorst ? ' 🐌 Slowest' : ''}`;
                
                return (
                  <div key={lap.number} className={containerClass}>
                    <div className="flex items-center">
                      <span className={numberClass}>{lap.number}</span>
                      <div>
                        <div className={timeClass}>{formatTime(lap.time)}</div>
                        <div className={splitClass}>{splitText}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {lap.timestamp}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Footer */}
      <footer className="text-center mt-8 text-xs text-slate-400">
        <p>Built with precision timing technology</p>
      </footer>
    </div>
  );
}
