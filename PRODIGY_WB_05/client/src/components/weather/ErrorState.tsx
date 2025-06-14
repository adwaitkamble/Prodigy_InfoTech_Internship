import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-6">
      <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-400/30">
        <div className="flex items-center space-x-3 text-white">
          <AlertTriangle className="text-red-300 text-xl" />
          <div>
            <h3 className="font-medium mb-1">Unable to get weather data</h3>
            <p className="text-white/80 text-sm">
              {error || "Please check your internet connection and try again."}
            </p>
          </div>
        </div>
        <Button 
          onClick={onRetry}
          className="mt-4 bg-white/20 hover:bg-white/30 text-white border-none"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
