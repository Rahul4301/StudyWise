import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  UploadCloud,
  Layers3,
  BrainCircuit,
  MessageSquareMore,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Upload Document',
    description: 'Process your study materials and let AI do the heavy lifting.',
    href: '/dashboard/upload',
    icon: UploadCloud,
  },
  {
    title: 'Review Flashcards',
    description: 'Test your knowledge with automatically generated flashcards.',
    href: '/dashboard/flashcards',
    icon: Layers3,
  },
  {
    title: 'Explore Mind Map',
    description: 'Visualize connections and key concepts from your document.',
    href: '/dashboard/mind-map',
    icon: BrainCircuit,
  },
  {
    title: 'Ask Anything',
    description: 'Get instant answers to your questions, no document needed.',
    href: '/dashboard/ask',
    icon: MessageSquareMore,
  },
  {
    title: 'Generate Video',
    description: 'Create AI-generated videos from your documents.',
    href: '/dashboard/generate-video',
    icon: UploadCloud, // you can swap this for a more relevant icon
  },
];


export default function DashboardHomePage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to your Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to start learning? Here&apos;s what you can do.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.href}
            className="group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="group-hover:bg-accent">
                <Link href={feature.href}>
                  Go to {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
