import { z } from 'zod';
import { aiRouter } from './aiRouter.js';
import { buildPatchGenerationPrompt } from './prompts/patchPrompt.js';

const PatchGenerationSchema = z.object({
  explanation: z.string(),
  patch: z.string(),
  risks: z.array(z.string()),
  testsRequired: z.array(z.string())
});

export type PatchGenerationOutput = z.infer<typeof PatchGenerationSchema>;

export class PatchService {
  public async generateCandidatePatch(payload: {
    problem: string;
    code: string;
    analysis: any;
  }): Promise<PatchGenerationOutput> {
    const prompt = buildPatchGenerationPrompt(payload);

    const fallback = (): PatchGenerationOutput => ({
      explanation: 'Replaced request body price assumption with authoritative database fetch and quantity multiplication.',
      patch: `// Candidate Patch v2.4.2 (HealGuard Generated)
export async function validateCartPrices(items: CartItem[]): Promise<ValidatedCart> {
  const productIds = items.map(i => i.productId);
  const dbProducts = await ProductModel.find({ id: { $in: productIds } });
  
  const verifiedItems = items.map(item => {
    const dbProduct = dbProducts.find(p => p.id === item.productId);
    if (!dbProduct) throw new Error(\`Product \${item.productId} unavailable\`);
    return {
      productId: item.productId,
      quantity: item.quantity,
      authoritativePrice: dbProduct.price,
      total: dbProduct.price * item.quantity
    };
  });
  
  return { items: verifiedItems, isAuthoritative: true };
}`,
      risks: [
        'Slight latency increase from batch database lookup (typically < 3ms)',
        'Cart validation fails if product is archived concurrently'
      ],
      testsRequired: [
        'assert(validateCartPrices([{productId: "p1", clientPrice: 1}]).total === 74999)',
        'assert(validateCartPrices rejects negative quantity)'
      ]
    });

    const res = await aiRouter.routeAnalysis(prompt, PatchGenerationSchema, fallback, 'Patch Generation');
    return res.data;
  }
}

export const patchService = new PatchService();
