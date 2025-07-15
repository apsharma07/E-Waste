import Image from 'next/image';
import { MapPin, Globe, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockLocations = [
  {
    name: 'GreenLeaf Recycling Center',
    address: '123 Eco Way, Emerald City, 12345',
    phone: '555-123-4567',
    website: 'https://greenleaf.example.com',
    accepts: ['Laptops', 'Phones', 'Batteries', 'Cables'],
  },
  {
    name: 'CircuitSavers E-Waste Drop-off',
    address: '456 Tech Park, Silicon Valley, 67890',
    phone: '555-987-6543',
    website: 'https://circuitsavers.example.com',
    accepts: ['Monitors', 'Printers', 'Keyboards', 'Mice'],
  },
  {
    name: 'City Public Works',
    address: '789 Civic Center, Metropolis, 54321',
    phone: '555-555-5555',
    website: 'https://metropolis.gov/ewaste',
    accepts: ['All Consumer Electronics'],
  },
];


export default function LocationFinder() {
  return (
    <div id="map" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter">Find a Drop-off Location</h2>
        <p className="text-muted-foreground">
          Find a convenient, certified e-waste recycling center near you.
        </p>
      </div>
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src="3899753_22704.jpg"
            alt="A stylized map showing pins for various recycling locations in a city."
            layout="fill"
            objectFit="cover"
            data-ai-hint="city map"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLocations.map((location) => (
          <Card key={location.name} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{location.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0 text-primary" />
                <a href={location.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors break-all">
                  Visit Website
                </a>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 mt-2">Accepts:</h4>
                <div className="flex flex-wrap gap-2">
                    {location.accepts.map((item) => (
                        <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
