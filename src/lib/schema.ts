import { z } from 'zod';

export const serviceItemSchema = z.object({
  description: z.string().min(1, 'Açıklama gereklidir.'),
  cost: z.coerce.number().nonnegative('Maliyet negatif olamaz.'),
});

export const formSchema = z.object({
  companyName: z.string().min(1, 'Firma adı gereklidir.'),
  companyAddress: z.string().min(1, 'Firma adresi gereklidir.'),
  companyPhone: z.string().min(1, 'Telefon numarası gereklidir.'),
  companyEmail: z.string().email('Geçersiz e-posta adresi.'),
  logoUrl: z.string().url('Geçersiz URL.').optional().or(z.literal('')),
  billToName: z.string().min(1, 'Müşteri adı gereklidir.'),
  billToAddress: z.string().min(1, 'Müşteri adresi gereklidir.'),
  quoteDate: z.string().min(1, 'Tarih gereklidir.'),
  quoteId: z.string().min(1, 'Teklif No gereklidir.'),
  serviceItems: z.array(serviceItemSchema).min(1, 'En az bir hizmet kalemi gereklidir.'),
});

export type QuoteFormData = z.infer<typeof formSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
