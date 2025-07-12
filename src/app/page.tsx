import Header from '@/components/header';
import HeroSection from '@/components/hero';
import AiDetection from '@/components/ai-detection';
import LocationFinder from '@/components/location-finder';
import DataWipeGuide from '@/components/data-wipe-guide';
import LocationSubmission from '@/components/location-submission';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div id="features" className="container mx-auto px-4 py-12 md:py-20 space-y-16">
          <AiDetection />
          <Separator />
          <LocationFinder />
          <Separator />
          <DataWipeGuide />
          <Separator />
          <LocationSubmission />
        </div>
      </main>
      <footer className="bg-secondary text-secondary-foreground py-6">
          <div className="container mx-auto text-center text-sm">
              <p>&copy; {new Date().getFullYear()} E-Cycle Vision. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
