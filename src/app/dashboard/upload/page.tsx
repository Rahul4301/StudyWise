'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { generateFlashcards } from '@/ai/flows/generate-flashcards';
import { generateMindMap } from '@/ai/flows/generate-mind-map';
import { Loader2, Sparkles, Wand2, FileUp, X } from 'lucide-react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        handleFileUpload(file);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF, DOCX, or TXT file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsParsing(true);
    setDocumentText('');
    toast({
      title: 'Parsing Document',
      description: 'Extracting text from your file...',
    });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/parse-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to parse file.';
        try {
          // Read response once as text
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch {
            console.error('Error response was not JSON:', text);
            errorMessage = `Server returned an error: ${response.status} ${response.statusText}`;
          }
        } catch (e) {
          console.error('Could not read error response body:', e);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setDocumentText(data.content || "");
      toast({
        title: 'File Parsed Successfully',
        description: 'You can now process the document.',
        variant: 'default',
        className: 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
      });
    } catch (error: any) {
      console.error('Error parsing file:', error);
      toast({
        title: 'Parsing Failed',
        description: error.message || 'Something went wrong while parsing the file.',
        variant: 'destructive',
      });
      setSelectedFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleProcessDocument = async () => {
    if (!documentText.trim()) {
      toast({
        title: 'Error',
        description: 'No content to process. Please upload a file first.',
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
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Upload Document</h1>
        <p className="text-muted-foreground mt-1">
          Upload a file to generate AI-powered study materials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your File</CardTitle>
          <CardDescription>Accepts PDF, DOCX, and TXT files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors ${
                isParsing ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isParsing ? (
                  <>
                    <Loader2 className="w-8 h-8 mb-4 text-primary animate-spin" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Parsing file...</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Please wait</p>
                  </>
                ) : selectedFile ? (
                  <div className="text-center">
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">File selected:</span> {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClear();
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove file
                    </Button>
                  </div>
                ) : (
                  <>
                    <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                  </>
                )}
              </div>
              <Input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".pdf,.docx,.txt"
                disabled={isParsing || isProcessing}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleProcessDocument}
              disabled={isProcessing || isParsing || !(documentText && documentText.trim())}
            >
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
            <Button onClick={handleClear} variant="outline" disabled={isProcessing || isParsing}>
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

