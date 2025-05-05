import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { YoutubeIcon } from "lucide-react";
import UrlInputForm from "./UrlInputForm";
import ProcessingIndicator from "./ProcessingIndicator";
import TranscriptViewer from "./TranscriptViewer";

interface Transcript {
  id: string;
  title: string;
  content: string;
  url: string;
}

export default function TranscriptExtractionSection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [processedVideos, setProcessedVideos] = useState(0);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [activeTab, setActiveTab] = useState("input");

  const handleExtractTranscripts = (
    urls: string[],
    type: "video" | "playlist" | "channel",
  ) => {
    // This would be replaced with actual API calls in a real implementation
    setIsProcessing(true);
    setProgress(0);
    setProcessedVideos(0);

    // Mock data for demonstration
    const mockTotalVideos =
      type === "video" ? urls.length : type === "playlist" ? 10 : 20;
    setTotalVideos(mockTotalVideos);

    // Simulate processing with a timer
    const mockTranscripts: Transcript[] = [];
    let processed = 0;

    const interval = setInterval(() => {
      processed += 1;
      const newProgress = Math.round((processed / mockTotalVideos) * 100);

      setProgress(newProgress);
      setProcessedVideos(processed);

      // Add a mock transcript
      mockTranscripts.push({
        id: `video-${processed}`,
        title: `Video ${processed} Title`,
        content: `This is the transcript content for video ${processed}. It would contain the actual transcript text extracted from the YouTube video.`,
        url: urls[0] || `https://youtube.com/watch?v=mock${processed}`,
      });

      if (processed >= mockTotalVideos) {
        clearInterval(interval);
        setIsProcessing(false);
        setTranscripts(mockTranscripts);
        setActiveTab("results");
      }
    }, 500);
  };

  return (
    <div className="bg-background p-6 md:p-10 rounded-lg">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <YoutubeIcon className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold tracking-tight">
              Extract Your Transcripts
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground">
            Extract transcripts in bulk from YouTube videos, playlists, or
            entire channels
          </p>
        </header>

        <Separator className="my-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="results" disabled={transcripts.length === 0}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter YouTube URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <UrlInputForm onSubmit={handleExtractTranscripts} />
              </CardContent>
            </Card>

            {isProcessing && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProcessingIndicator
                    progress={progress}
                    processedCount={processedVideos}
                    totalCount={totalVideos}
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Extracted Transcripts</CardTitle>
              </CardHeader>
              <CardContent>
                <TranscriptViewer transcripts={transcripts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
