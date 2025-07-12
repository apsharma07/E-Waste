'use server';

import { detectEwaste, type DetectEwasteOutput } from '@/ai/flows/detect-ewaste';
import { locationSchema } from '@/lib/schemas';

export async function handleDetectEwaste(photoDataUri: string): Promise<DetectEwasteOutput | null> {
    try {
        const result = await detectEwaste({ photoDataUri });
        return result;
    } catch (error) {
        console.error("Error in handleDetectEwaste:", error);
        if (error instanceof Error) {
            throw new Error(`AI detection failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred during AI detection.");
    }
}

export type LocationFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function handleAddLocation(
  prevState: LocationFormState,
  formData: FormData,
): Promise<LocationFormState> {
    const validatedFields = locationSchema.safeParse({
        name: formData.get('name'),
        address: formData.get('address'),
        website: formData.get('website'),
        notes: formData.get('notes'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid form data. Please check your entries.",
            status: "error",
        };
    }

    try {
        // In a real app, you would save this to a database (e.g., Firestore)
        console.log("New location submitted:", validatedFields.data);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            message: "Thank you! Your location has been submitted for review.",
            status: "success",
        };
    } catch (error) {
        console.error("Error submitting location:", error);
        return {
            message: "There was an error submitting your location. Please try again.",
            status: "error",
        };
    }
}
