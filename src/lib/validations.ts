import { z } from 'zod';

export const INCIDENT_TYPES = [
  'Physical Harassment',
  'Verbal Harassment',
  'Cyberbullying',
  'Sexual Harassment',
  'Discrimination',
  'Neglect',
  'Emotional Abuse',
  'Domestic Violence',
  'Other',
] as const;

export const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

export const reportSchema = z.object({
  incidentType: z.enum(INCIDENT_TYPES, {
    required_error: 'Please select an incident type',
    invalid_type_error: 'Invalid incident type',
  }),
  incidentDate: z.string().optional().refine(
    (val) => !val || !isNaN(Date.parse(val)),
    { message: 'Invalid date format' }
  ),
  location: z.string()
    .max(255, 'Location must be less than 255 characters')
    .optional()
    .transform(val => val?.trim() || undefined),
  severity: z.enum(SEVERITY_LEVELS, {
    required_error: 'Please select a severity level',
  }),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(10000, 'Description must be less than 10,000 characters')
    .transform(val => val.trim()),
});

export const reportUpdateSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5,000 characters')
    .transform(val => val.trim()),
});

export type ReportFormData = z.infer<typeof reportSchema>;
export type ReportUpdateFormData = z.infer<typeof reportUpdateSchema>;
