'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { answerQuestion } from '@/ai/flows/answer-question';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

export default function AskPage() {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a question.',
        variant: 'destructive',
      });
      return;
    }

    setIsAsking(true);
    setAnswer('');
    toast({
      title: 'Asking AI...',
      description: 'The AI is pondering your question.',
    });

    try {
      const result = await answerQuestion({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Could not get an answer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Ask AI</h1>
        <p className="text-muted-foreground mt-1">
          Have a question? Get an instant answer from our AI assistant.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Question</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., What are the main principles of atomic design?"
            className="min-h-[100px] text-base"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isAsking}
          />
          <div className="mt-4">
            <Button onClick={handleAskQuestion} disabled={isAsking || !question.trim()}>
              {isAsking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Ask Question
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isAsking && (
         <Card className="flex flex-col items-center justify-center p-12 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold font-headline">Finding an answer...</h3>
            <p className="text-muted-foreground">The AI is thinking hard!</p>
         </Card>
      )}

      {answer && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary h-6 w-6" />
                AI&apos;s Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
