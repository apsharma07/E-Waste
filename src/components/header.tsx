import { Recycle } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">E-Cycle Vision</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6 justify-end">
            <Link href="#ai-detector" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">AI Detector</Link>
            <Link href="#map" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Find Locations</Link>
            <Link href="#submit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Add Location</Link>
        </nav>
      </div>
    </header>
  );
}
