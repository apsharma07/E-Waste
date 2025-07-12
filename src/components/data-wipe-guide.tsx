import { Smartphone, Laptop, HardDrive, ShieldCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DataWipeGuide() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter">Secure Data Wiping Guide</h2>
        <p className="text-muted-foreground">
          Before you recycle, protect your privacy. Follow these steps to securely wipe your personal data from your devices.
        </p>
         <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex-row items-center gap-4">
                <ShieldCheck className="w-12 h-12 text-primary"/>
                <div>
                    <CardTitle>Why is this important?</CardTitle>
                    <CardDescription>Deleting files isn't enough. Factory resets can sometimes leave data recoverable. Secure wiping ensures your personal information is gone for good.</CardDescription>
                </div>
            </CardHeader>
         </Card>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center space-x-3">
                  <Smartphone className="text-primary"/>
                  <span>Smartphones & Tablets</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2 pl-10 text-muted-foreground">
                <p>1. <strong>Back up your data:</strong> Use iCloud, Google Drive, or transfer to a computer.</p>
                <p>2. <strong>Sign out of all accounts:</strong> iCloud, Google, Samsung, etc. This deactivates security locks.</p>
                <p>3. <strong>Perform a factory reset:</strong> On iOS, go to Settings &gt; General &gt; Transfer or Reset &gt; Erase All Content and Settings. On Android, this is usually under Settings &gt; System &gt; Reset options.</p>
                <p>4. <strong>Remove SIM and SD cards.</strong></p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center space-x-3">
                  <Laptop className="text-primary"/>
                  <span>Laptops & Desktops</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2 pl-10 text-muted-foreground">
                 <p>1. <strong>Back up your data:</strong> Use an external drive or cloud service.</p>
                 <p>2. <strong>Deauthorize software:</strong> Sign out of iTunes, Adobe, etc.</p>
                 <p>3. <strong>macOS:</strong> Reboot into Recovery Mode (Cmd+R on startup). Use Disk Utility to erase the hard drive. Reinstall macOS.</p>
                 <p>4. <strong>Windows 10/11:</strong> Go to Settings &gt; Update & Security &gt; Recovery. Under "Reset this PC," choose "Get started" and then "Remove everything." Select the option to fully clean the drive.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center space-x-3">
                  <HardDrive className="text-primary"/>
                  <span>External Hard Drives</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2 pl-10 text-muted-foreground">
                <p>1. <strong>Back up any needed data.</strong></p>
                <p>2. <strong>Use disk utility software:</strong> For both Windows and macOS, you can format the drive. Choose a secure erase option if available (multiple passes).</p>
                <p>3. <strong>For highly sensitive data:</strong> Consider physical destruction of the drive platters after software wiping.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
