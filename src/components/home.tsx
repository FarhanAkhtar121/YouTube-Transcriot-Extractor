import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { YoutubeIcon, ArrowRight, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LandingPageSection from "./LandingPageSection";
import ExtractionProcessSteps from "./ExtractionProcessSteps";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <YoutubeIcon className="h-16 w-16 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              YouTube Transcript Extractor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Extract transcripts in bulk from YouTube videos, playlists, or
              entire channels with our powerful and easy-to-use tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link to="/extract">
                  Start Extracting <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl py-16 px-6 space-y-16">
        {/* Link to Transcript Extraction and Pricing */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Ready to Extract Transcripts?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <LandingPageSection title="Extract Transcripts">
              <p className="mb-4">
                Our powerful extraction tool allows you to quickly get
                transcripts from YouTube videos, playlists, or entire channels
                in just a few clicks.
              </p>
              <Button asChild>
                <Link to="/extract">Go to Extractor</Link>
              </Button>
            </LandingPageSection>

            <LandingPageSection title="Pricing Plans">
              <p className="mb-4">
                Choose the plan that fits your needs. From individual creators
                to enterprise teams, we have options for everyone.
              </p>
              <Button variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </LandingPageSection>
          </div>
        </section>

        <Separator />

        {/* How the extraction process works */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our transcript extraction process is simple, fast, and accurate.
            </p>
          </div>
          <ExtractionProcessSteps />
        </section>

        <Separator />

        {/* Supported Languages */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Supported Languages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tool supports transcript extraction in over 100 languages.
            </p>
          </div>
          <LandingPageSection title="Global Language Support">
            <div className="flex items-center justify-center mb-6">
              <Globe className="h-16 w-16 text-primary" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "English",
                "Spanish",
                "French",
                "German",
                "Italian",
                "Portuguese",
                "Russian",
                "Japanese",
                "Korean",
                "Chinese",
                "Arabic",
                "Hindi",
                "Dutch",
                "Swedish",
                "Polish",
                "Turkish",
                "Vietnamese",
                "Thai",
                "Indonesian",
                "Greek",
                "Czech",
                "Danish",
                "Finnish",
                "Norwegian",
              ].map((language, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{language}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-muted-foreground">
              And many more! Our system automatically detects and extracts
              available subtitles in any language.
            </p>
          </LandingPageSection>
        </section>

        {/* More sections will be added in subsequent implementations */}
      </div>
    </div>
  );
}
