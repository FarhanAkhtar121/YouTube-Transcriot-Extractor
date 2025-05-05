import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProcessingIndicatorProps {
  isProcessing?: boolean;
  progress?: number;
  processedCount?: number;
  totalCount?: number;
  estimatedTimeRemaining?: string;
}

const ProcessingIndicator = ({
  isProcessing = false,
  progress = 0,
  processedCount = 0,
  totalCount = 0,
  estimatedTimeRemaining = "0 seconds",
}: ProcessingIndicatorProps) => {
  if (!isProcessing) return null;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <h3 className="text-lg font-medium">Processing Transcripts</h3>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              <span className="font-medium">{processedCount}</span> of{" "}
              <span className="font-medium">{totalCount}</span> videos processed
            </div>
            <div>
              <span className="font-medium">~{estimatedTimeRemaining}</span>{" "}
              remaining
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingIndicator;
