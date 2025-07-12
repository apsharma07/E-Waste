"use client";

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { BrainCircuit, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleDetectEwaste } from '@/app/actions';
import type { DetectEwasteOutput } from '@/ai/flows/detect-ewaste';

export default function AiDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectEwasteOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !previewUrl) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image of your e-waste.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ewasteResult = await handleDetectEwaste(previewUrl);
      if (ewasteResult) {
        setResult(ewasteResult);
      } else {
        throw new Error("AI could not process the image.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Detection Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-detector" className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter">AI E-Waste Detector</h2>
        <p className="text-muted-foreground">
          Not sure what you have? Upload a picture, and our AI will identify the type of e-waste and provide disposal instructions.
        </p>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="picture" className="text-sm font-medium">Upload Image</label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                            Detect
                        </Button>
                    </div>
                </div>
                {previewUrl && (
                    <div className="relative w-full h-64 mt-4 rounded-lg overflow-hidden border shadow-inner">
                        <Image src={previewUrl} alt="E-waste preview" layout="fill" objectFit="contain" />
                    </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-full min-h-[300px] lg:min-h-[400px]">
        {isLoading && (
            <Card className="h-full flex flex-col items-center justify-center animate-pulse shadow-lg">
                <CardHeader>
                    <CardTitle>Analyzing Image...</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <Loader2 className="h-16 w-16 text-primary animate-spin" />
                    <p className="text-muted-foreground mt-4">Our AI is on the case!</p>
                </CardContent>
            </Card>
        )}
        {error && (
            <Card className="h-full flex flex-col items-center justify-center border-destructive bg-destructive/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-destructive">Detection Failed</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
                    <p className="text-destructive mt-4">{error}</p>
                </CardContent>
            </Card>
        )}
        {result && (
            <Card className="h-full shadow-lg animate-in fade-in-50 duration-500">
                <CardHeader>
                    <CardTitle className="text-primary">Detection Result</CardTitle>
                    <CardDescription>Based on your image, we've identified the following:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-muted-foreground">E-Waste Type:</h3>
                        <p className="text-xl text-foreground font-bold">{result.ewasteType}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-muted-foreground">Disposal Instructions:</h3>
                        <p className="text-foreground whitespace-pre-wrap">{result.disposalInstructions}</p>
                    </div>
                </CardContent>
            </Card>
        )}
        {!isLoading && !result && !error && (
             <Card className="h-full flex flex-col items-center justify-center bg-secondary/50 border-dashed border-2">
                <CardContent className="text-center p-6">
                    <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                    <h3 className="text-lg font-semibold mt-4">Awaiting Image</h3>
                    <p className="text-muted-foreground mt-1">Upload a photo to get started.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
