import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LandingPageSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function LandingPageSection({
  title,
  children,
  className = "",
}: LandingPageSectionProps) {
  return (
    <Card className={`shadow-md bg-white ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
