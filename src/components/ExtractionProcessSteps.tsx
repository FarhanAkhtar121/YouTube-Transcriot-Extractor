import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, FileText, Download } from "lucide-react";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ExtractionProcessSteps() {
  const steps: ProcessStep[] = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Enter URL",
      description:
        "Paste YouTube video, playlist, or channel URL into our extractor.",
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-primary" />,
      title: "Process",
      description:
        "Our system analyzes the content and extracts available transcripts.",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Review",
      description: "View and edit the extracted transcripts as needed.",
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Download",
      description:
        "Save transcripts in your preferred format (TXT, SRT, or JSON).",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <Card
          key={index}
          className="shadow-md bg-white hover:shadow-lg transition-shadow"
        >
          <CardHeader className="flex flex-col items-center text-center pb-2">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              {step.icon}
            </div>
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            {step.description}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
