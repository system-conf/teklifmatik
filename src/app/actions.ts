"use server";

import { generateServiceAgreement, type GenerateServiceAgreementInput } from '@/ai/flows/generate-service-agreement';
import { z } from 'zod';

const ActionInputSchema = z.object({
    companyName: z.string(),
    companyAddress: z.string(),
    serviceDescription: z.string(),
    termsAndConditions: z.string(),
});

export async function createServiceAgreement(input: GenerateServiceAgreementInput) {
    const parsedInput = ActionInputSchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    try {
        const result = await generateServiceAgreement(parsedInput.data);
        return { success: true, data: result };
    } catch (error) {
        console.error("Service agreement generation failed:", error);
        return { success: false, error: "Hizmet sözleşmesi oluşturulamadı. Lütfen daha sonra tekrar deneyin." };
    }
}
