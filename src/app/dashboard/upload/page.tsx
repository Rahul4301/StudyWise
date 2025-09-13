'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { generateFlashcards } from '@/ai/flows/generate-flashcards';
import { generateMindMap } from '@/ai/flows/generate-mind-map';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    documentText,
    setDocumentText,
    setSummary,
    setFlashcards,
    setMindMapData,
    summary,
    isProcessing,
    setIsProcessing,
    clearAllData,
  } = useAppContext();
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleProcessDocument = async () => {
    if (!documentText.trim()) {
      toast({
        title: 'Error',
        description: 'Please paste some content into the text area.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setIsSummaryVisible(false);
    toast({
      title: 'Processing Document',
      description: 'The AI is working its magic. This may take a moment...',
    });

    try {
      const [summaryRes, flashcardsRes, mindMapRes] = await Promise.all([
        summarizeDocument({ documentText }),
        generateFlashcards({ documentContent: documentText }),
        generateMindMap({ documentText }),
      ]);

      setSummary(summaryRes.summary);
      setFlashcards(flashcardsRes);
      setMindMapData(mindMapRes.mindMapJson);

      setIsSummaryVisible(true);

      toast({
        title: 'Success!',
        description: 'Your document has been processed.',
        variant: 'default',
        className: 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700'
      });
      
    } catch (error) {
      console.error('Error processing document:', error);
      toast({
        title: 'Processing Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleClear = () => {
    clearAllData();
    setIsSummaryVisible(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Upload Document</h1>
        <p className="text-muted-foreground mt-1">
          Paste your document content below to generate study materials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Content</CardTitle>
          <CardDescription>Paste your text from a PDF, DOCX, or any text file.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your document content here..."
            className="min-h-[300px] text-base"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            disabled={isProcessing}
          />
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button onClick={handleProcessDocument} disabled={isProcessing || !documentText.trim()}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Process Document
                </>
              )}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isProcessing}>
                Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {isProcessing && (
         <Card className="flex flex-col items-center justify-center p-12 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold font-headline">Analyzing your document</h3>
            <p className="text-muted-foreground">Generating summary, flashcards, and mind map...</p>
         </Card>
      )}

      {isSummaryVisible && summary && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary h-6 w-6" />
                AI-Generated Summary
            </CardTitle>
            <CardDescription>Here are the key points from your document.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
                <Button onClick={() => router.push('/dashboard/flashcards')}>View Flashcards</Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/mind-map')}>Explore Mind Map</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
