import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit, BookOpen, GraduationCap } from 'lucide-react';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline">StudyWise</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
              Unlock Your Learning Potential
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              StudyWise uses AI to transform your documents into summaries, flashcards, and mind maps, making learning faster and more effective.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Learning Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {heroImage && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl shadow-2xl overflow-hidden">
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </section>
        )}

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Features Designed for Modern Learners</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to supercharge your study sessions.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-min mb-4">
                  <BrainCircuit className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">AI-Powered Summaries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Instantly get the key points from any document. Our AI reads, analyzes, and summarizes for you.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-min mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Smart Flashcards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Automatically generate flashcards from your study materials to test your knowledge and retain more.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-min mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Interactive Mind Maps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualize complex topics with automatically generated mind maps. See the connections and big picture.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-muted-foreground" />
            <span className="text-muted-foreground">StudyWise</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} StudyWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
