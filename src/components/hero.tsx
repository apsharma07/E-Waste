import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary-foreground-from-background">
            Smart E-Waste Recycling, Simplified.
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Use AI to identify your e-waste, find nearby recycling centers, and learn how to securely wipe your data. Your responsible tech lifecycle starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#ai-detector">
              <Button size="lg" className="w-full sm:w-auto">Identify E-Waste</Button>
            </Link>
            <Link href="#map">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Find Drop-offs</Button>
            </Link>
          </div>
        </div>
        <div className="relative h-64 md:h-96 w-full">
            <Image 
                src="10563467.jpg" 
                alt="A collection of old electronic devices like phones, laptops, and cables neatly arranged for recycling." 
                fill
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="e-waste recycling"
            />
        </div>
      </div>
    </section>
  );
}
