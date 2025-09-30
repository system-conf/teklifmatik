"use client";

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Copy } from 'lucide-react';
import { createServiceAgreement } from '@/app/actions';
import type { QuoteFormData } from '@/lib/schema';
import { useToast } from '@/hooks/use-toast';

export default function ServiceAgreementModal() {
  const { getValues } = useFormContext<QuoteFormData>();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState('');
  const [agreement, setAgreement] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setAgreement('');
    const values = getValues();
    const serviceDescription = values.serviceItems
      .map(item => `${item.description} (${item.unitPrice} TL)`)
      .join(', ');

    const input = {
      companyName: values.companyName,
      companyAddress: values.companyAddress,
      serviceDescription: serviceDescription,
      termsAndConditions: terms,
    };

    const result = await createServiceAgreement(input);

    if (result.success && result.data) {
      setAgreement(result.data.serviceAgreement);
    } else {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: result.error || 'Sözleşme oluşturulamadı.',
      });
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(agreement);
    toast({
      title: 'Kopyalandı!',
      description: 'Sözleşme metni panoya kopyalandı.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Wand2 className="mr-2 h-4 w-4" />
          Yapay Zeka ile Hizmet Sözleşmesi Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Hizmet Sözleşmesi Oluşturucu</DialogTitle>
          <DialogDescription>
            Temel maddeleri girerek yapay zekanın sizin için bir hizmet sözleşmesi hazırlamasını sağlayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="terms">Şartlar ve Koşullar</Label>
            <Textarea
              id="terms"
              placeholder="Örn: Ödeme 30 gün içinde yapılmalıdır. Garanti süresi 1 yıldır."
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading || !terms}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Oluşturuluyor...' : 'Sözleşme Oluştur'}
          </Button>
          {agreement && (
            <div className="grid gap-2 relative mt-4">
              <Label htmlFor="agreement">Oluşturulan Sözleşme</Label>
              <Textarea
                id="agreement"
                readOnly
                value={agreement}
                className="min-h-[200px] bg-muted"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="absolute top-8 right-2"
                aria-label="Copy agreement"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Kapat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
