'use client';

import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group aspect-[3/2] w-full [perspective:1000px] cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-xl shadow-lg transition-all duration-500 [transform-style:preserve-3d]',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Card className="h-full w-full flex flex-col justify-center items-center p-6 text-center">
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm font-medium">QUESTION</p>
              <p className="text-xl md:text-2xl font-semibold">{question}</p>
            </CardContent>
             <div className="absolute bottom-4 right-4 flex items-center gap-2 text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <RotateCcw className="h-3 w-3" />
              Click to flip
            </div>
          </Card>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Card className="h-full w-full flex flex-col justify-center items-center p-6 text-center bg-secondary">
             <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm font-medium">ANSWER</p>
              <p className="text-lg md:text-xl font-medium">{answer}</p>
            </CardContent>
             <div className="absolute bottom-4 right-4 flex items-center gap-2 text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <RotateCcw className="h-3 w-3" />
              Click to flip
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
