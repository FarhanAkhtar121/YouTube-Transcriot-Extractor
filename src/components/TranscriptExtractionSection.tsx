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

  const handleExtractTranscripts = async (
    urls: string[],
    type: "video" | "playlist" | "channel",
  ) => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedVideos(0);

    try {
      const response = await fetch('http://localhost:8000/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urls[0] }), // Adjust for multiple URLs if needed
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.json();
      setTranscripts([{ id: data.video_id, title: 'Video Title', content: data.transcript, url: urls[0] }]);
      setActiveTab("results"); // Switch to results tab
    } catch (error) {
      console.error('Error fetching transcript:', error);
    } finally {
      setIsProcessing(false);
    }
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