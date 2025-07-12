import { z } from 'zod';

export const locationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  address: z.string().min(10, "Please provide a valid address."),
  website: z.string().url("Please provide a valid URL.").optional().or(z.literal('')),
  notes: z.string().optional(),
});
