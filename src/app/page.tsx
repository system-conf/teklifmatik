"use client";

import { useEffect, useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { formSchema, type QuoteFormData } from '@/lib/schema';
import QuoteForm from '@/components/quote-form';
import QuotePreview from '@/components/quote-preview';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function Home() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: 'Şahin Tesisat',
      companyAddress: 'Kemalpaşa Mah. İmaret Yokuşu Sk. No:28 - İzmit / KOCAELİ',
      companyPhone: '0534 948 23 74',
      companyEmail: 'info@sahintesisat.com.tr',
      billToName: '',
      billToAddress: '',
      quoteDate: '',
      quoteId: '',
      serviceItems: [
        { description: 'Su kaçağı tespiti', quantity: 1, unitPrice: 0 },
        { description: 'Tıkalı boru açma', quantity: 1, unitPrice: 0 },
        { description: 'Temiz – pis su tesisatı', quantity: 1, unitPrice: 0 },
        { description: 'Kombi montajı', quantity: 1, unitPrice: 0 },
        { description: 'Fayans işleri', quantity: 1, unitPrice: 0 },
      ],
      includeVat: true,
      vatRate: 20,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!methods.getValues('quoteId')) {
      methods.setValue('quoteId', `ŞT-${Math.floor(1000 + Math.random() * 9000)}`);
    }
    if (!methods.getValues('quoteDate')) {
      methods.setValue('quoteDate', new Date().toLocaleDateString('tr-TR'));
    }
  }, [methods]);

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;
  
    setIsGeneratingPdf(true);
    try {
      // Ensure the preview is rendered at a consistent width
      const originalWidth = element.style.width;
      element.style.width = '1024px'; // A reasonable width for A4
  
      await new Promise(resolve => setTimeout(resolve, 0)); // Allow DOM to update
  
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        windowHeight: element.scrollHeight,
      });
  
      // Restore original width
      element.style.width = originalWidth;
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
  
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(`teklif-${methods.getValues('quoteId')}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      methods.setError('root.serverError', {
        type: 'manual',
        message: 'PDF oluşturulurken bir hata oluştu.',
      });
    } finally {
      setIsGeneratingPdf(false);
      // Ensure style is restored even on error
      if (element) {
        element.style.width = '';
      }
    }
  };
  
  const watchedData = methods.watch();

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background text-foreground font-body">
        <header className="bg-card border-b sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10 text-primary" />
              <h1 className="text-2xl font-bold font-headline text-card-foreground">
                Teklifmatik
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <QuoteForm />
            </div>

            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold font-headline">Teklif Önizlemesi</h2>
                  <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isGeneratingPdf ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {isGeneratingPdf ? 'Oluşturuluyor...' : 'PDF İndir'}
                  </Button>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-auto">
                   <div ref={previewRef} className="p-8 bg-white">
                    <QuotePreview watchedData={watchedData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
