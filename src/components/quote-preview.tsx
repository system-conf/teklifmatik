"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { QuoteFormData } from '@/lib/schema';
import { Separator } from './ui/separator';

interface QuotePreviewProps {
  watchedData: QuoteFormData;
}

export default function QuotePreview({ watchedData }: QuotePreviewProps) {
  const companyLogoPlaceholder = PlaceHolderImages.find((p) => p.id === 'companyLogo');
  
  const {
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    logoUrl,
    billToName,
    billToAddress,
    quoteDate,
    quoteId,
    serviceItems,
  } = watchedData;

  const totalCost = serviceItems.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);

  return (
    <div className="bg-white text-black p-8 font-sans text-sm">
      <header className="flex justify-between items-start mb-10 flex-wrap">
        <div className="flex-auto pr-4 mb-4">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={`${companyName} Logo`}
              width={150}
              height={75}
              className="object-contain"
              data-ai-hint={companyLogoPlaceholder?.imageHint || 'company logo'}
              unoptimized
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{companyName}</h1>
          <p className="text-gray-600">{companyAddress}</p>
          <p className="text-gray-600">{companyPhone}</p>
          <p className="text-gray-600">{companyEmail}</p>
        </div>
        <div className="text-right min-w-[200px]">
          <h2 className="text-4xl font-bold text-gray-400 uppercase tracking-widest">Teklif</h2>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Teklif No:</span> {quoteId}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Tarih:</span> {quoteDate}
          </p>
        </div>
      </header>

      <section className="mb-10">
        <h3 className="font-semibold text-gray-500 border-b pb-2 mb-2">Müşteri</h3>
        <p className="font-bold text-gray-800">{billToName}</p>
        <p className="text-gray-600">{billToAddress}</p>
      </section>

      <section>
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
            <thead className="bg-gray-100">
                <tr>
                <th className="p-3 font-semibold text-gray-700">Açıklama</th>
                <th className="p-3 font-semibold text-gray-700 text-right w-40">Tutar</th>
                </tr>
            </thead>
            <tbody>
                {serviceItems?.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">{item.description}</td>
                    <td className="p-3 text-gray-800 text-right">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.cost || 0)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>

      <section className="flex justify-end mt-6">
        <div className="w-full max-w-xs space-y-3">
          <Separator />
          <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
            <span className="font-bold text-lg text-gray-800">TOPLAM</span>
            <span className="font-bold text-lg text-gray-800">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalCost)}
            </span>
          </div>
        </div>
      </section>
      
      <footer className="mt-20 text-center text-xs text-gray-400">
        <p>Teklifin geçerlilik süresi 15 gündür.</p>
        <p>{companyName} | {companyPhone}</p>
      </footer>
    </div>
  );
}
