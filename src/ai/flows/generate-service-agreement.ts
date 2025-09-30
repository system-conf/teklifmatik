// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates a service agreement from the terms provided by the user.
 *
 * - generateServiceAgreement - A function that generates a service agreement.
 * - GenerateServiceAgreementInput - The input type for the generateServiceAgreement function.
 * - GenerateServiceAgreementOutput - The return type for the generateServiceAgreement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateServiceAgreementInputSchema = z.object({
  companyName: z.string().describe('The name of the company providing the service.'),
  companyAddress: z.string().describe('The address of the company providing the service.'),
  serviceDescription: z.string().describe('A description of the service being provided.'),
  termsAndConditions: z.string().describe('The terms and conditions of the service agreement.'),
});
export type GenerateServiceAgreementInput = z.infer<typeof GenerateServiceAgreementInputSchema>;

const GenerateServiceAgreementOutputSchema = z.object({
  serviceAgreement: z.string().describe('The generated service agreement.'),
});
export type GenerateServiceAgreementOutput = z.infer<typeof GenerateServiceAgreementOutputSchema>;

export async function generateServiceAgreement(input: GenerateServiceAgreementInput): Promise<GenerateServiceAgreementOutput> {
  return generateServiceAgreementFlow(input);
}

const generateServiceAgreementPrompt = ai.definePrompt({
  name: 'generateServiceAgreementPrompt',
  input: {schema: GenerateServiceAgreementInputSchema},
  output: {schema: GenerateServiceAgreementOutputSchema},
  prompt: `You are an expert contract writer. Based on the information provided, generate a comprehensive service agreement.

Company Name: {{{companyName}}}
Company Address: {{{companyAddress}}}
Service Description: {{{serviceDescription}}}
Terms and Conditions: {{{termsAndConditions}}}

Service Agreement:`, 
});

const generateServiceAgreementFlow = ai.defineFlow({
    name: 'generateServiceAgreementFlow',
    inputSchema: GenerateServiceAgreementInputSchema,
    outputSchema: GenerateServiceAgreementOutputSchema,
  },
  async input => {
    const {output} = await generateServiceAgreementPrompt(input);
    return output!;
  }
);
