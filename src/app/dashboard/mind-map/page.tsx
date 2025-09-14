'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BrainCircuit, ArrowRight, AlertTriangle } from 'lucide-react';
import { MindMapNode } from '@/components/mind-map-node';
import { useMemo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Helper function to extract JSON from a string that might contain markdown backticks
function extractJsonFromString(str: string): string | null {
  const match = str.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
  return match ? (match[1] || match[2]) : str;
}

export default function MindMapPage() {
  const { mindMapData } = useAppContext();

  const parsedData = useMemo(() => {
    if (!mindMapData) return null;
    try {
      const cleanedJsonString = extractJsonFromString(mindMapData);
      if (!cleanedJsonString) {
        throw new Error("No JSON content found in the provided data.");
      }
      return JSON.parse(cleanedJsonString);
    } catch (error) {
      console.error('Failed to parse mind map JSON:', error);
      return { error: 'Failed to parse mind map data. The format might be invalid.' };
    }
  }, [mindMapData]);

  if (!parsedData) {
    return (
      <Card className="text-center p-12">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-min mb-4">
            <BrainCircuit className="h-10 w-10" />
          </div>
          <CardTitle className="font-headline text-2xl">No Mind Map Available</CardTitle>
          <CardDescription>
            You haven&apos;t generated a mind map. Upload a document to create one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/upload">
              Upload a Document <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (parsedData.error) {
    return (
         <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <CardTitle>Error loading Mind Map</CardTitle>
            <AlertDescription>
                {parsedData.error} Please try generating it again from the upload page.
            </AlertDescription>
         </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mind Map</h1>
        <p className="text-muted-foreground mt-1">
          Explore the concepts from your document in this interactive structure.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 overflow-x-auto">
          <div className="min-w-max">
            <MindMapNode node={parsedData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
