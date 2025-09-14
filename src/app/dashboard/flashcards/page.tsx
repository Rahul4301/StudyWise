'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Layers3, ArrowRight } from 'lucide-react';
import { Flashcard } from '@/components/flashcard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export default function FlashcardsPage() {
  const { flashcards } = useAppContext();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (flashcards.length === 0) {
    return (
      <Card className="text-center p-12">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-min mb-4">
            <Layers3 className="h-10 w-10" />
          </div>
          <CardTitle className="font-headline text-2xl">No Flashcards Yet</CardTitle>
          <CardDescription>
            You haven&apos;t generated any flashcards. Upload a document to get started.
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

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Flashcards</h1>
        <p className="text-muted-foreground mt-1">
          Review the key concepts from your document. Click a card to flip it.
        </p>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="transform scale-100 max-w-2xl w-full">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {flashcards.map((card, index) => (
                <CarouselItem key={index}>
                  <Flashcard question={card.question} answer={card.answer} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Card {current} of {count}
      </div>
    </div>
  );
}
