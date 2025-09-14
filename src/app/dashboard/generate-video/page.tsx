'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clapperboard } from 'lucide-react';

export default function GenerateVideoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Generate Video</h1>
        <p className="text-muted-foreground mt-1">
          Create an AI-powered video from your study materials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Generator</CardTitle>
          <CardDescription>This is just a placeholder for now.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Clapperboard className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
