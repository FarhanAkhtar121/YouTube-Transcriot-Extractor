import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UrlInputFormProps {
  onSubmit: (urls: string[], type: "video" | "playlist" | "channel") => void;
  isProcessing?: boolean;
}

const UrlInputForm = ({
  onSubmit,
  isProcessing = false,
}: UrlInputFormProps) => {
  const [urls, setUrls] = useState<string>("");
  const [urlType, setUrlType] = useState<"video" | "playlist" | "channel">(
    "video",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!urls.trim()) {
      setError("Please enter at least one YouTube URL");
      return;
    }

    // Split by newlines and filter empty lines
    const urlList = urls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    // Basic URL validation
    const isYoutubeUrl = (url: string) => {
      return url.includes("youtube.com") || url.includes("youtu.be");
    };

    if (!urlList.every(isYoutubeUrl)) {
      setError("All URLs must be valid YouTube URLs");
      return;
    }

    onSubmit(urlList, urlType);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="urls" className="text-base font-medium">
              Enter YouTube URLs (one per line)
            </Label>
            <Textarea
              id="urls"
              placeholder="https://www.youtube.com/watch?v=...
https://www.youtube.com/playlist?list=..."
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="min-h-[120px] resize-y"
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">URL Type</Label>
            <RadioGroup
              value={urlType}
              onValueChange={(value) =>
                setUrlType(value as "video" | "playlist" | "channel")
              }
              className="flex space-x-4"
              disabled={isProcessing}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="playlist" id="playlist" />
                <Label htmlFor="playlist">Playlist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="channel" id="channel" />
                <Label htmlFor="channel">Channel</Label>
              </div>
            </RadioGroup>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Extract Transcripts"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlInputForm;
