"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useRef, useActionState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z as zod } from "zod";

import { handleAddLocation } from "@/app/actions";
import { locationSchema } from "@/lib/schemas";
import type { LocationFormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

type LocationFormData = zod.infer<typeof locationSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Submit Location
    </Button>
  );
}

export default function LocationSubmission() {
  const [state, formAction] = useActionState(handleAddLocation, { message: "", status: "idle" });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const { register, formState: { errors }, reset } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
      reset();
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: state.message,
      });
    }
  }, [state, toast, reset]);
  
  return (
    <div id="submit" className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Help Our Community Grow</h2>
            <p className="text-muted-foreground">
            Know a great e-waste recycling spot? Add it to our map. Your contributions help everyone recycle more responsibly.
            </p>
            <Card className="bg-secondary/50 border-dashed">
                <CardHeader>
                    <CardTitle>What We Look For</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                    <p>✓ Certified e-waste recyclers</p>
                    <p>✓ Retailer take-back programs</p>
                    <p>✓ Municipal collection sites</p>
                    <p>✓ Verified charity drop-off points</p>
                </CardContent>
            </Card>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Submit a New Location</CardTitle>
                <CardDescription>Fill out the form below. Our team will review your submission.</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={formAction} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Location Name</Label>
                        <Input id="name" {...register("name")} />
                        {(errors.name || (state.status === 'error' && state.message.toLowerCase().includes('name'))) && <p className="text-sm text-destructive">{errors.name?.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="address">Full Address</Label>
                        <Input id="address" {...register("address")} />
                        {(errors.address || (state.status === 'error' && state.message.toLowerCase().includes('address'))) && <p className="text-sm text-destructive">{errors.address?.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="website">Website (optional)</Label>
                        <Input id="website" placeholder="https://example.com" {...register("website")} />
                        {(errors.website || (state.status === 'error' && state.message.toLowerCase().includes('url'))) && <p className="text-sm text-destructive">{errors.website?.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea id="notes" placeholder="e.g., Only accepts items on weekends, located behind the main building." {...register("notes")} />
                        {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
