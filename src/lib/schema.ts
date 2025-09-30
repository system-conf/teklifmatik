import { z } from 'zod';

export const serviceItemSchema = z.object({
  description: z.string().min(1, 'Açıklama gereklidir.'),
  quantity: z.coerce.number().min(1, 'Adet en az 1 olmalıdır.'),
  unitPrice: z.coerce.number().nonnegative('Birim fiyat negatif olamaz.'),
});

export const formSchema = z.object({
  logoUrl: z.string().url('Geçerli bir URL giriniz.').optional().or(z.literal('')),
  companyName: z.string().min(1, 'Firma adı gereklidir.'),
  companyAddress: z.string().min(1, 'Firma adresi gereklidir.'),
  companyPhone: z.string().min(1, 'Telefon numarası gereklidir.'),
  companyEmail: z.string().email('Geçersiz e-posta adresi.'),
  billToName: z.string().min(1, 'Müşteri adı gereklidir.'),
  billToAddress: z.string().min(1, 'Müşteri adresi gereklidir.'),
  quoteDate: z.string().min(1, 'Tarih gereklidir.'),
  quoteId: z.string().min(1, 'Teklif No gereklidir.'),
  serviceItems: z.array(serviceItemSchema),
  includeVat: z.boolean(),
  vatRate: z.coerce.number().min(0, 'KDV oranı negatif olamaz.').max(100, 'KDV oranı 100\'den büyük olamaz.'),
});

export type QuoteFormData = z.infer<typeof formSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
