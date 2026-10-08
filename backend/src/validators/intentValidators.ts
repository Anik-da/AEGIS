import { z } from 'zod';

export const IntentContractSchema = z.object({
  goal: z.string().min(1),
  budget: z.object({
    max: z.number().nonnegative(),
    currency: z.string().default('INR')
  }),
  hardConstraints: z.array(z.string()).default([]),
  preferences: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  priorities: z.array(z.string()).default([]),
  riskLevel: z.enum(['low', 'medium', 'high']).default('low')
});

export type IntentContractDTO = z.infer<typeof IntentContractSchema>;

export const IntentAnalysisInputSchema = z.object({
  text: z.string().min(3, 'Intent description must be at least 3 characters long')
});

export const IntentMatchInputSchema = z.object({
  intentContract: IntentContractSchema,
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    category: z.string().optional(),
    specifications: z.record(z.any()).optional(),
    keySpecs: z.array(z.string()).optional()
  })
});

export const IntentEventInputSchema = z.object({
  type: z.enum(['CONTRACT_CREATED', 'PRODUCT_VIEWED', 'CART_ADDED', 'QUANTITY_CHANGED', 'ADDON_ADDED', 'CHECKOUT_PRICE_DRIFT']),
  payload: z.record(z.any())
});
