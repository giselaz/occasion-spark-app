import * as z from 'zod';


export const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required').max(100, 'Event name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  capacity: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1, 'Capacity must be at least 1')),
  fee: z.string().transform((val) => parseFloat(val)).pipe(z.number().min(0, 'Fee cannot be negative')),
  isFree: z.boolean(),
  tags: z.string().optional(),
});
export type EventFormData = z.infer<typeof eventSchema>;